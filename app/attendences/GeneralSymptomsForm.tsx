import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles/AttendanceStyles';
import { GeneralSymptoms } from './types';

interface GeneralSymptomsProps {
  data: GeneralSymptoms;
  onChange: (field: keyof GeneralSymptoms, value: string) => void;
}

const GeneralSymptomsForm: React.FC<GeneralSymptomsProps> = ({ data, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sintomas Gerais</Text>

      {/* Não Bebe ou Mama */}
      <Text style={styles.label}>Não Bebe ou Mama:</Text>
      <Picker
        selectedValue={data.nao_bebe_ou_mama || 'no'}
        onValueChange={(value) => onChange('nao_bebe_ou_mama', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Vomita Tudo */}
      <Text style={styles.label}>Vomita Tudo:</Text>
      <Picker
        selectedValue={data.vomita_tudo || 'no'}
        onValueChange={(value) => onChange('vomita_tudo', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Convulsões */}
      <Text style={styles.label}>Convulsões:</Text>
      <Picker
        selectedValue={data.convulsoes || 'no'}
        onValueChange={(value) => onChange('convulsoes', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Letárgica */}
      <Text style={styles.label}>Letárgica:</Text>
      <Picker
        selectedValue={data.letargica || 'no'}
        onValueChange={(value) => onChange('letargica', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Enchimento Capilar */}
      <Text style={styles.label}>Enchimento Capilar:</Text>
      <Picker
        selectedValue={data.enchimento_capilar || 'no'}
        onValueChange={(value) => onChange('enchimento_capilar', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Batimento de Asa */}
      <Text style={styles.label}>Batimento de Asa:</Text>
      <Picker
        selectedValue={data.batimento_asa || 'no'}
        onValueChange={(value) => onChange('batimento_asa', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Tem Tosse */}
      <Text style={styles.label}>Tem Tosse:</Text>
      <Picker
        selectedValue={data.tem_tosse || 'no'}
        onValueChange={(value) => onChange('tem_tosse', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Sibilância */}
      <Text style={styles.label}>Sibilância:</Text>
      <Picker
        selectedValue={data.sibilancia || 'no'}
        onValueChange={(value) => onChange('sibilancia', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Tem Diarreia */}
      <Text style={styles.label}>Tem Diarreia:</Text>
      <Picker
        selectedValue={data.tem_diarreia || 'no'}
        onValueChange={(value) => onChange('tem_diarreia', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Tem Febre */}
      <Text style={styles.label}>Tem Febre:</Text>
      <Picker
        selectedValue={data.tem_febre || 'no'}
        onValueChange={(value) => onChange('tem_febre', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Rigidez de Nuca */}
      <Text style={styles.label}>Rigidez de Nuca:</Text>
      <Picker
        selectedValue={data.rigidez_nuca || 'no'}
        onValueChange={(value) => onChange('rigidez_nuca', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Problema de Ouvido */}
      <Text style={styles.label}>Problema de Ouvido:</Text>
      <Picker
        selectedValue={data.problema_ouvido || 'no'}
        onValueChange={(value) => onChange('problema_ouvido', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Dor de Garganta */}
      <Text style={styles.label}>Dor de Garganta:</Text>
      <Picker
        selectedValue={data.dor_garganta || 'no'}
        onValueChange={(value) => onChange('dor_garganta', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Gemido */}
      <Text style={styles.label}>Gemido:</Text>
      <Picker
        selectedValue={data.gemido || 'no'}
        onValueChange={(value) => onChange('gemido', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Cianose Periférica */}
      <Text style={styles.label}>Cianose Periférica:</Text>
      <Picker
        selectedValue={data.cianose_periferica || 'no'}
        onValueChange={(value) => onChange('cianose_periferica', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Icterícia */}
      <Text style={styles.label}>Icterícia:</Text>
      <Picker
        selectedValue={data.ictericia || 'no'}
        onValueChange={(value) => onChange('ictericia', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Distensão Abdominal */}
      <Text style={styles.label}>Distensão Abdominal:</Text>
      <Picker
        selectedValue={data.distensao_abdominal || 'no'}
        onValueChange={(value) => onChange('distensao_abdominal', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Emagrecimento */}
      <Text style={styles.label}>Emagrecimento:</Text>
      <Picker
        selectedValue={data.emagrecimento || 'no'}
        onValueChange={(value) => onChange('emagrecimento', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>

      {/* Edema */}
      <Text style={styles.label}>Edema:</Text>
      <Picker
        selectedValue={data.edema || 'no'}
        onValueChange={(value) => onChange('edema', value)}
        style={styles.picker}>
        <Picker.Item label="Sim" value="yes" />
        <Picker.Item label="Não" value="no" />
      </Picker>
    </View>
  );
};

export default GeneralSymptomsForm;
