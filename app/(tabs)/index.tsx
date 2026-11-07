import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

const SENTIMENTOS = [
  { id: 'SOLIDAO', label: 'Solidão', emoji: '🌧️' },
  { id: 'ANSIEDADE', label: 'Ansiedade', emoji: '🌪️' },
  { id: 'LUTO', label: 'Luto / Perda', emoji: '🥀' },
  { id: 'EXAUSTAO', label: 'Exaustão', emoji: '⚓' },
  { id: 'GRATIDAO', label: 'Gratidão Contida', emoji: '🌅' },
];

export default function TelaDesabafo() {
  const [sentimentoSelecionado, setSentimentoSelecionado] = useState<string>('');
  const [desabafoTexto, setDesabafoTexto] = useState<string>('');
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleEnviarDesabafo = async () => {
    if (!sentimentoSelecionado) {
      Alert.alert('Sintonia', 'Por favor, seleciona qual sentimento reflete melhor o teu coração hoje.');
      return;
    }

    if (!desabafoTexto.trim()) {
      Alert.alert('Sem filtros', 'Escreve um pouco sobre o que estás a sentir antes de enviar.');
      return;
    }

    setEnviando(true);

    try {
      console.log('Enviando desabafo:', {
        categoria_emocional: sentimentoSelecionado,
        conteudo_texto: desabafoTexto,
        data_registro: new Date().toISOString()
      });

      setTimeout(() => {
        setEnviando(false);
        setDesabafoTexto('');
        setSentimentoSelecionado('');
        Alert.alert(
          'Ouvido com Carinho',
          'O teu desabafo foi lançado no fluxo. Em breve, alguém em sintonia com a tua dor poderá acolher-te.'
        );
      }, 1000);
    } catch (error) {
      setEnviando(false);
      Alert.alert('Erro', 'Não foi possível enviar o teu desabafo de momento.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          
          <View style={styles.headerContainer}>
            <Text style={styles.subtituloHeader}>LISTEN TO THE MUSIC</Text>
            <Text style={styles.tituloHeader}>Qual é o som do teu coração hoje?</Text>
            <Text style={styles.descricaoHeader}>
              Fala antes que as lágrimas nasçam. Sem filtros, sem julgamentos e sem busca por gostos.
            </Text>
          </View>

          <Text style={styles.labelSecao}>1. Escolhe a frequência do teu sentimento:</Text>
          <View style={styles.sentimentosContainer}>
            {SENTIMENTOS.map((item) => {
              const selecionado = sentimentoSelecionado === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.chipSentimento, selecionado && styles.chipSelecionado]}
                  onPress={() => setSentimentoSelecionado(item.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.emojiChip}>{item.emoji}</Text>
                  <Text style={[styles.textoChip, selecionado && styles.textoChipSelecionado]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.labelSecao}>2. Rasga o coração (desabafo livre):</Text>
          <TextInput
            style={styles.inputDesabafo}
            multiline
            numberOfLines={6}
            placeholder="Escreve aqui o que está a pesar aí dentro... Ninguém te vai julgar."
            placeholderTextColor="#8A8A8E"
            value={desabafoTexto}
            onChangeText={setDesabafoTexto}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.botaoEnviar, enviando && styles.botaoDesabilitado]}
            onPress={handleEnviarDesabafo}
            disabled={enviando}
            activeOpacity={0.85}
          >
            <Text style={styles.textoBotaoEnviar}>
              {enviando ? 'A lançar no fluxo...' : 'Lançar Desabafo no Fluxo'}
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 28,
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
    marginBottom: 8,
  },
  descricaoHeader: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 20,
  },
  labelSecao: {
    color: '#E2E8F0',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  sentimentosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  chipSentimento: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipSelecionado: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  emojiChip: {
    marginRight: 6,
    fontSize: 14,
  },
  textoChip: {
    color: '#CBD5E1',
    fontSize: 13,
    fontWeight: '500',
  },
  textoChipSelecionado: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  inputDesabafo: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    color: '#F8FAFC',
    fontSize: 15,
    lineHeight: 22,
    minHeight: 160,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  botaoEnviar: {
    backgroundColor: '#0284C7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoDesabilitado: {
    backgroundColor: '#475569',
  },
  textoBotaoEnviar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});