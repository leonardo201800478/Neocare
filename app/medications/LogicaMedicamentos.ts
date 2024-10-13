export const calculateDosage = ({
  patient,
  doctor,
  attendance,
  vitals,
}: {
  patient: any;
  doctor: any;
  attendance: any;
  vitals: any;
}) => {
  const dosages = [];

  // Exemplo de cálculo para Amoxicilina
  if (attendance?.hipertensao === 'no' && !attendance?.doenca_hepatica) {
    const dosageAmoxicilina = (20 * vitals.peso_kg).toFixed(2); // Exemplo de cálculo por kg
    dosages.push({
      medicamento: 'Amoxicilina',
      dosage: `${dosageAmoxicilina} mg`,
      frequency: 'Dividido em 2-3 doses',
    });
  }

  // Continuar lógica para os outros medicamentos...
  return dosages;
};
