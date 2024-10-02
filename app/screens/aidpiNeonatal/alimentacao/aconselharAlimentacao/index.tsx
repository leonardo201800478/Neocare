// app/screens/alimentacao/aconselhar_alimentacao/index.tsx

import { useRouter } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

export default function AconselharAlimentacao() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Aconselhar à Mãe ou o Acompanhante Quanto a Problemas de Alimentação
      </Text>
      <Text style={styles.content}>
        Se a criança não estiver sendo alimentada conforme descrito acima, orientar devidamente à
        mãe ou ao acompanhante. Além disso:
      </Text>

      <Text style={styles.section}>
        * Se a mãe declarar ter dificuldade com a amamentação, avaliar a amamentação. (Consultar o
        quadro A CRIANÇA DE 1 SEMANA A 2 MESES DE IDADE). Quando for preciso, mostre à mãe a posição
        e a pega corretas para a amamentação.
      </Text>
      <Text style={styles.section}>
        * Se a criança tiver menos de 6 meses e estiver tomando outro tipo de leite ou alimento:
      </Text>
      <Text style={styles.bulletPoint}>
        - Aumentar a confiança da mãe de que ela pode produzir todo o leite que a criança necessita;
      </Text>
      <Text style={styles.bulletPoint}>
        - Sugerir que ela dê o peito com maior frequência e por mais tempo, de dia e à noite e para
        reduzir gradativamente ou tipo de leite ou alimentos. É importante retirar a mamadeira;
      </Text>
      <Text style={styles.bulletPoint}>
        - Como esta época é importante para a alimentação da criança, peça à mãe que volte em 2
        dias;
      </Text>

      <Text style={styles.section}>
        * Se for necessário continuar a dar outro tipo de leite, recomendar à mãe a:
      </Text>
      <Text style={styles.bulletPoint}>
        - Amamentar ao peito tanto quanto possível, inclusive à noite;
      </Text>
      <Text style={styles.bulletPoint}>
        - Certificar-se de que o outro tipo de leite seja apropriado e esteja disponível;
      </Text>
      <Text style={styles.bulletPoint}>
        - Assegurar-se de que o outro tipo de leite seja preparado higiênico e corretamente, e
        ministrado em quantidades apropriadas em copinho ou colher;
      </Text>
      <Text style={styles.bulletPoint}>
        - Oferecer de forma responsável e no horário da fome. Não usar restos de leite ou outros
        alimentos de uma refeição para outra;
      </Text>

      <Text style={styles.section}>
        * Se a mãe estiver usando mamadeira para alimentar a criança:
      </Text>
      <Text style={styles.bulletPoint}>
        - Recomendar que se use um copo pequeno, colher ou xícara no lugar da mamadeira;
      </Text>
      <Text style={styles.bulletPoint}>
        - Ensine-a a alimentar a criança com a xícara/copo ou colher;
      </Text>

      <Text style={styles.section}>
        * Se a criança não estiver sendo alimentada de forma ativa, recomendar à mãe a:
      </Text>
      <Text style={styles.bulletPoint}>- Sentar-se com a criança e incentivá-la a comer;</Text>
      <Text style={styles.bulletPoint}>
        - Servir à criança uma porção adequada em prato ou tigela separada;
      </Text>
      <Text style={styles.bulletPoint}>
        - Se possível, deixar que sua própria colher para estimulá-la a comer ativamente, assim como
        para desenvolver precocemente sua coordenação motora; A mãe deve ficar junto à criança,
        ajudando-a para que coma o suficiente;
      </Text>

      <Text style={styles.section}>
        * Se a criança não estiver se alimentando bem durante a doença, recomendar à mãe a:
      </Text>
      <Text style={styles.bulletPoint}>
        - Amamentar ao peito com maior frequência e, se possível, por mais tempo;
      </Text>
      <Text style={styles.bulletPoint}>
        - Usar alimentos como maior frequência, evitando sobrecarregar a textura, respeitando a sua
        aceitação;
      </Text>
      <Text style={styles.bulletPoint}>
        - Depois da doença, oferecer pequenas refeições adicionais, assim como alimentos preferidos
        até que a criança se recupere;
      </Text>
      <Text style={styles.bulletPoint}>
        - Oferecer ao de nósmes, verduras streaplanholada a cada refeição ou coalhada;
      </Text>
      <Text style={styles.bulletPoint}>
        - Quanto o apetite há de melhorar é possível que a mãe se relacione bem a alimentação;
      </Text>

      <Text style={styles.section}>
        * Fazer o acompanhamento de qualquer problema alimentar em 5 dias.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'brown',
  },
  content: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'justify',
  },
  bulletPoint: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
    textAlign: 'justify',
  },
});
