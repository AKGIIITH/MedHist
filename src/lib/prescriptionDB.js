import { supabase } from './supabase';

// Save prescription to Supabase database
// 1. Find or create patient by (mobile, doctor_id)
// 2. Insert prescription with full formData as JSONB
// Returns null gracefully if DB tables don't exist yet
export async function savePrescription(formData, doctorId) {
  if (!doctorId) return null;
  if (!formData.mobile) return null;

  try {
    // Find or create patient
    let patientId;

    const { data: existingPatient, error: findErr } = await supabase
      .from('patients')
      .select('id')
      .eq('mobile', formData.mobile)
      .eq('doctor_id', doctorId)
      .single();

    if (findErr && findErr.code === 'PGRST205') {
      // Table doesn't exist — skip DB save silently
      console.warn('Database tables not set up — skipping cloud save.');
      return null;
    }

    if (existingPatient) {
      patientId = existingPatient.id;

      // Update patient info if changed
      await supabase.from('patients').update({
        name: formData.name || null,
        age: formData.age || null,
        sex: formData.sex || null,
      }).eq('id', patientId);
    } else {
      const { data: newPatient, error } = await supabase
        .from('patients')
        .insert({
          mobile: formData.mobile,
          name: formData.name || null,
          age: formData.age || null,
          sex: formData.sex || null,
          doctor_id: doctorId,
        })
        .select('id')
        .single();

      if (error) throw error;
      patientId = newPatient.id;
    }

    // Insert prescription
    const { data, error } = await supabase
      .from('prescriptions')
      .insert({
        doctor_id: doctorId,
        patient_id: patientId,
        form_data: formData,
      })
      .select('id')
      .single();

    if (error) throw error;
    return { prescriptionId: data.id, patientId };
  } catch (err) {
    console.warn('Prescription save to DB failed:', err.message);
    return null;
  }
}
