// app/medications/LogicaMedicamentos.ts
export const calculateDosage = ({
  patient,
  doctor,
  attendance,
  vitals,
  allergies,
}: {
  patient: any;
  doctor: any;
  attendance: any;
  vitals: any;
  allergies: any;
}) => {
  const dosages = [];

  // 1. Soluções de Reidratação Oral (SRO)
  if (!allergies?.SRO) {
    const dosageSRO = (50 * vitals.peso_kg).toFixed(2); // Exemplo de cálculo por kg
    dosages.push({
      medicamento: 'Soluções de Reidratação Oral (SRO)',
      dosage: `${dosageSRO} ml`,
      frequency: 'Dependendo do nível de desidratação',
      contraindications: 'Nenhuma específica',
    });
  }

  // 2. Sulfato Ferroso
  if (!attendance?.doenca_hepatica && !allergies?.allergy_ferrous_sulfate) {
    const dosageSulfatoFerroso = (3 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Sulfato Ferroso',
      dosage: `${dosageSulfatoFerroso} mg`,
      frequency: 'Uma vez ao dia',
    });
  }

  // 3. Amoxicilina
  if (!allergies?.allergy_penicillin) {
    const dosageAmoxicilina = (20 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Amoxicilina',
      dosage: `${dosageAmoxicilina} mg`,
      frequency: 'Dividido em 2-3 doses',
    });
  } else {
    dosages.push({
      medicamento: 'Amoxicilina',
      contraindication: 'Paciente alérgico à penicilina',
    });
  }

  // 4. Cotrimoxazol
  if (!allergies?.allergy_sulfa) {
    const dosageCotrimoxazol = (8 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Cotrimoxazol',
      dosage: `${dosageCotrimoxazol} mg`,
      frequency: 'Duas vezes ao dia',
    });
  } else {
    dosages.push({
      medicamento: 'Cotrimoxazol',
      contraindication: 'Paciente alérgico à sulfa',
    });
  }

  // 5. Eritromicina
  const dosageEritromicina = (30 * vitals.peso_kg).toFixed(2);
  dosages.push({
    medicamento: 'Eritromicina',
    dosage: `${dosageEritromicina} mg`,
    frequency: 'Dividido em 4 doses',
  });

  // 6. Zinco (Suplemento)
  if (!allergies?.zinco) {
    const dosageZinco = patient?.age < 18 ? '10-20 mg' : '20 mg'; // Cálculo por idade
    dosages.push({
      medicamento: 'Zinco (Suplemento)',
      dosage: `${dosageZinco}`,
      frequency: 'Uma vez ao dia por 10-14 dias',
      contraindications:
        'Separar ingestão de certos antibióticos e alimentos ricos em fibras, produtos lácteos e farelo',
    });
  }

  // 7. Paracetamol
  if (!attendance?.doenca_hepatica && !allergies?.allergy_paracetamol) {
    const dosageParacetamol = (10 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Paracetamol',
      dosage: `${dosageParacetamol} mg`,
      frequency: 'Até 4 vezes ao dia (máximo: 40 mg/kg/dia)',
    });
  } else {
    dosages.push({
      medicamento: 'Paracetamol',
      contraindication: 'Paciente com doença hepática ou alérgico ao paracetamol',
    });
  }

  // 8. Ibuprofeno
  if (!attendance?.hipertensao && !allergies?.allergy_ibuprofen) {
    const dosageIbuprofeno = (5 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Ibuprofeno',
      dosage: `${dosageIbuprofeno} mg`,
      frequency: 'A cada 6-8 horas',
    });
  } else {
    dosages.push({
      medicamento: 'Ibuprofeno',
      contraindication: 'Paciente com hipertensão ou alérgico a AINEs',
    });
  }

  // 9. Vitamina A
  dosages.push({
    medicamento: 'Vitamina A',
    dosage: patient.age < 1 ? '100.000 UI' : '200.000 UI',
    frequency: 'Dose única a cada 4-6 meses',
  });

  // 10. Albendazol
  dosages.push({
    medicamento: 'Albendazol',
    dosage: patient.age >= 2 ? '400 mg' : '200 mg',
    frequency: 'Dose única',
  });

  // 11. Mebendazol
  dosages.push({
    medicamento: 'Mebendazol',
    dosage: '100 mg',
    frequency: 'Duas vezes ao dia por 3 dias',
  });

  // 12. Ácido Fólico
  if (!allergies?.acidoFolico) {
    dosages.push({
      medicamento: 'Ácido Fólico',
      dosage: '0,1-0,4 mg',
      frequency: 'Uma vez ao dia',
      contraindications: 'Nenhuma específica',
    });
  }

  // 13. Metronidazol
  if (!allergies?.allergy_metronidazole) {
    const dosageMetronidazol = (7.5 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Metronidazol',
      dosage: `${dosageMetronidazol} mg`,
      frequency: 'A cada 8 horas',
    });
  } else {
    dosages.push({
      medicamento: 'Metronidazol',
      contraindication: 'Paciente alérgico ao metronidazol',
    });
  }

  // 14. Cloroquina/Primaquina
  if (!allergies?.cloroquina && attendance?.deficiencia_g6pd === 'no') {
    dosages.push({
      medicamento: 'Cloroquina/Primaquina',
      dosage: 'Sob supervisão médica',
      frequency: 'Dependendo da condição clínica',
      contraindications: 'Deficiência de G6PD, histórico de cardiopatias (risco de arritmias)',
    });
  }

  // 15. Salbutamol (xarope ou inalatório)
  if (!allergies?.allergy_salbutamol) {
    const dosageSalbutamol = (0.1 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Salbutamol',
      dosage: `${dosageSalbutamol} mg`,
      frequency: 'Até 3-4 vezes ao dia',
    });
  } else {
    dosages.push({
      medicamento: 'Salbutamol',
      contraindication: 'Paciente alérgico ao salbutamol',
    });
  }

  // 16. Nistatina (oral)
  dosages.push({
    medicamento: 'Nistatina (oral)',
    dosage: '100.000 UI',
    frequency: '4 vezes ao dia',
  });

  // 17. Permetrina/Benzoato de Benzila
  dosages.push({
    medicamento: 'Permetrina/Benzoato de Benzila',
    dosage: 'Aplicar topicamente conforme necessário',
    frequency: 'Conforme necessário',
  });

  // 18. Cefalexina
  if (!allergies?.allergy_cephalosporin) {
    const dosageCefalexina = (25 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Cefalexina',
      dosage: `${dosageCefalexina} mg`,
      frequency: 'Dividido em 4 doses',
    });
  } else {
    dosages.push({
      medicamento: 'Cefalexina',
      contraindication: 'Paciente alérgico a cefalosporinas',
    });
  }

  // 19. Claritromicina
  const dosageClaritromicina = (7.5 * vitals.peso_kg).toFixed(2);
  dosages.push({
    medicamento: 'Claritromicina',
    dosage: `${dosageClaritromicina} mg`,
    frequency: 'A cada 12 horas',
  });

  // 20. Gentamicina Colírio
  if (!allergies?.allergy_gentamicin) {
    dosages.push({
      medicamento: 'Gentamicina Colírio',
      dosage: '1-2 gotas em cada olho',
      frequency: 'A cada 4-6 horas',
    });
  } else {
    dosages.push({
      medicamento: 'Gentamicina Colírio',
      contraindication: 'Paciente alérgico à gentamicina',
    });
  }

  // 21. Hidroxizina
  const dosageHidroxizina = (0.5 * vitals.peso_kg).toFixed(2);
  dosages.push({
    medicamento: 'Hidroxizina',
    dosage: `${dosageHidroxizina} mg`,
    frequency: 'A cada 6-8 horas',
  });

  // 22. Bromoprida
  const dosageBromoprida = (0.5 * vitals.peso_kg).toFixed(2);
  dosages.push({
    medicamento: 'Bromoprida',
    dosage: `${dosageBromoprida} mg`,
    frequency: 'Dividido em 3 doses ao dia',
  });

  // 23. Aciclovir (oral)
  const dosageAciclovir = (20 * vitals.peso_kg).toFixed(2);
  dosages.push({
    medicamento: 'Aciclovir (oral)',
    dosage: `${dosageAciclovir} mg`,
    frequency: '4 vezes ao dia por 5 dias',
  });

  // 24. Clorexidina Tópica
  dosages.push({
    medicamento: 'Clorexidina Tópica',
    dosage: 'Aplicar conforme necessário',
    frequency: 'Para limpeza e desinfecção',
  });

  // 25. Tetraciclina (pomada oftálmica)
  if (!allergies?.allergy_tetracycline) {
    dosages.push({
      medicamento: 'Tetraciclina (pomada oftálmica)',
      dosage: 'Aplicar 2-4 vezes ao dia',
      frequency: 'Para infecções oculares',
    });
  } else {
    dosages.push({
      medicamento: 'Tetraciclina (pomada oftálmica)',
      contraindication: 'Paciente alérgico à tetraciclina',
    });
  }

  // 26. Povidona Iodada
  dosages.push({
    medicamento: 'Povidona Iodada',
    dosage: 'Aplicar conforme necessário',
    frequency: 'Antisséptico para feridas',
  });

  // 27. Metoclopramida
  const dosageMetoclopramida = (0.1 * vitals.peso_kg).toFixed(2);
  dosages.push({
    medicamento: 'Metoclopramida',
    dosage: `${dosageMetoclopramida} mg`,
    frequency: 'Até 3 vezes ao dia',
  });

  // 28. Dexametasona (gota oftálmica)
  dosages.push({
    medicamento: 'Dexametasona (gota oftálmica)',
    dosage: '1-2 gotas',
    frequency: '4-6 vezes ao dia',
  });

  // 29. Miconazol (creme ou pomada)
  dosages.push({
    medicamento: 'Miconazol (creme ou pomada)',
    dosage: 'Aplicar 2 vezes ao dia',
    frequency: 'Para infecções fúngicas',
  });

  // 30. Salicilato de Metila
  dosages.push({
    medicamento: 'Salicilato de Metila',
    dosage: 'Aplicar topicamente conforme necessário',
    frequency: 'Para alívio de dores musculares e articulares',
  });

  // 31. Corticosteroides Tópicos (como Hidrocortisona Creme)
  dosages.push({
    medicamento: 'Corticosteroides Tópicos',
    dosage: 'Aplicar 1-2 vezes ao dia',
    frequency: 'Para inflamação e prurido cutâneo',
  });

  // 32. Lidocaína Gel
  dosages.push({
    medicamento: 'Lidocaína Gel',
    dosage: 'Aplicar uma pequena quantidade',
    frequency: 'Para alívio de dor local',
  });

  // 33. Sulfacetamida (colírio)
  dosages.push({
    medicamento: 'Sulfacetamida (colírio)',
    dosage: '1-2 gotas em cada olho',
    frequency: 'A cada 3-4 horas',
  });

  // 34. Permetrina 1% (xampu ou loção)
  dosages.push({
    medicamento: 'Permetrina 1%',
    dosage: 'Aplicar conforme necessário',
    frequency: 'Para tratamento de piolhos',
  });

  // 35. Prednisolona (oral)
  if (!attendance?.hipertensao && !attendance?.diabetes) {
    const dosagePrednisolona = (1 * vitals.peso_kg).toFixed(2);
    dosages.push({
      medicamento: 'Prednisolona (oral)',
      dosage: `${dosagePrednisolona} mg`,
      frequency: 'Dividido em 1-2 doses ao dia',
    });
  } else {
    dosages.push({
      medicamento: 'Prednisolona (oral)',
      contraindication: 'Paciente com hipertensão ou diabetes',
    });
  }

  // 36. Isotretinoína Tópica (sob supervisão médica)
  if (!attendance?.gravidez) {
    dosages.push({
      medicamento: 'Isotretinoína Tópica',
      dosage: 'Aplicar uma vez ao dia',
      frequency: 'Para tratamento de acne grave',
    });
  } else {
    dosages.push({
      medicamento: 'Isotretinoína Tópica',
      contraindication: 'Contraindicado durante a gravidez',
    });
  }

  // 37. Vitamina D
  dosages.push({
    medicamento: 'Vitamina D',
    dosage: '400-1000 UI',
    frequency: 'Uma vez ao dia',
  });

  return dosages;
};
