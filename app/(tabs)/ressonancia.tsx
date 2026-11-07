import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';

interface DesabafoItem {
  id: string;
  pseudonimo: string;
  sentimento: string;
  emoji: string;
  texto: string;
  tempo: string;
  respostasContador: number;
}

const DESABAFOS_MOCK: DesabafoItem[] = [
  {
    id: '1',
    pseudonimo: 'Caminhante Silencioso',
    sentimento: 'Solidão',
    emoji: '🌧️',
    texto: 'Às vezes parece que estou rodeado de pessoas na rua, mas completamente sozinho por dentro. A noite chega e o silêncio pesa.',
    tempo: 'Há 15 min',
    respostasContador: 3,
  },
  {
    id: '2',
    pseudonimo: 'Voz da Madrugada',
    sentimento: 'Ansiedade',
    emoji: '🌪️',
    texto: 'O peito aperta sem razão aparente. Tento respirar fundo, mas a mente não se cala.',
    tempo: 'Há 42 min',
    respostasContador: 5,
  },
  {
    id: '3',
    pseudonimo: 'Alma Peregrina',
    sentimento: 'Exaustão',
    emoji: '⚓',
    texto: 'Carregar tantas responsabilidades sem poder demonstrar fraqueza está a esgotar as minhas energias.',
    tempo: 'Há 2 horas',
    respostasContador: 2,
  },
];

export default function TelaRessonancia() {
  const [desabafoSelecionado, setDesabafoSelecionado] = useState<string | null>(null);
  const [textoResposta, setTextoResposta] = useState<string>('');

  const handleAcolher = (id: string) => {
    if (!textoResposta.trim()) {
      Alert.alert('Acolhimento', 'Escreve uma mensagem de apoio antes de enviar.');
      return;
    }

    Alert.alert(
      'Abraço Enviado',
      'A tua palavra de esperança foi entregue anonimamente a quem precisava de ser ouvido.'
    );
    setTextoResposta('');
    setDesabafoSelecionado(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.headerContainer}>
          <Text style={styles.subtituloHeader}>MURAL DE ESSÊNCIAS</Text>
          <Text style={styles.tituloHeader}>Frequências de Dor & Esperança</Text>
          <Text style={styles.descricaoHeader}>
            Lê com o coração. Aqui podes estender a mão a quem abriu a alma no silêncio.
          </Text>
        </View>

        <FlatList
          data={DESABAFOS_MOCK}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const estaExpandido = desabafoSelecionado === item.id;

            return (
              <View style={styles.cardDesabafo}>
                <View style={styles.cardHeader}>
                  <View style={styles.badgeSentimento}>
                    <Text style={styles.emojiBadge}>{item.emoji}</Text>
                    <Text style={styles.textoBadge}>{item.sentimento}</Text>
                  </View>
                  <Text style={styles.tempoTexto}>{item.tempo}</Text>
                </View>

                <Text style={styles.pseudonimoTexto}>{item.pseudonimo}</Text>
                <Text style={styles.conteudoTexto}>"{item.texto}"</Text>

                <TouchableOpacity
                  style={styles.botaoResponderCard}
                  onPress={() => setDesabafoSelecionado(estaExpandido ? null : item.id)}
                >
                  <Text style={styles.textoBotaoResponder}>
                    {estaExpandido ? 'Fechar acolhimento' : `🤝 Acolher esta alma (${item.respostasContador})`}
                  </Text>
                </TouchableOpacity>

                {estaExpandido && (
                  <View style={styles.areaResposta}>
                    <TextInput
                      style={styles.inputResposta}
                      placeholder="Deixa uma palavra de consolo ou uma canção de esperança..."
                      placeholderTextColor="#8A8A8E"
                      multiline
                      value={textoResposta}
                      onChangeText={setTextoResposta}
                    />
                    <TouchableOpacity
                      style={styles.botaoEnviarResposta}
                      onPress={() => handleAcolher(item.id)}
                    >
                      <Text style={styles.textoEnviarResposta}>Enviar Abraço Anónimo</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          }}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  subtituloHeader: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  tituloHeader: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  descricaoHeader: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  cardDesabafo: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeSentimento: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  emojiBadge: {
    fontSize: 12,
    marginRight: 4,
  },
  textoBadge: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: '600',
  },
  tempoTexto: {
    color: '#64748B',
    fontSize: 12,
  },
  pseudonimoTexto: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  conteudoTexto: {
    color: '#F8FAFC',
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  botaoResponderCard: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
  },
  textoBotaoResponder: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '600',
  },
  areaResposta: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  inputResposta: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 12,
    color: '#F8FAFC',
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  botaoEnviarResposta: {
    backgroundColor: '#0284C7',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoEnviarResposta: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});