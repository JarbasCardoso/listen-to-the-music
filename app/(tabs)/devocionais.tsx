import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';


interface DevocionalItem {
  id: string;
  titulo: string;
  musicaInspiracao: string;
  artista: string;
  referenciaBiblica: string;
  textoReflexao: string;
  trechoLetra: string;
  audioUri: string;
}

const DEVOCIONAIS_MOCK: DevocionalItem[] = [
  {
    id: '1',
    titulo: 'O Som do Regresso no Silêncio',
    musicaInspiracao: 'Listen to the Music',
    artista: 'The Doobie Brothers',
    referenciaBiblica: 'Salmos 40:1-3',
    trechoLetra: '"What the people need is a way to make \'em smile... Listen to the music all the time."',
    textoReflexao:
      'Em tempos onde o ruído do mundo tenta afogar a alma, a música atua como uma frequência de cura. Assim como o salmista esperou com paciência até ouvir um novo cântico nos seus lábios, a verdadeira esperança restaura o ritmo do nosso coração quando paramos para escutar a voz que sussurra no silêncio.',
    audioUri: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: '2',
    titulo: 'A Luz que Atravessa a Madrugada',
    musicaInspiracao: 'Here Comes the Sun',
    artista: 'The Beatles',
    referenciaBiblica: 'Lamentações 3:22-23',
    trechoLetra: '"Little darling, it\'s been a long cold lonely winter... Here comes the sun."',
    textoReflexao:
      'Há invernos da alma que parecem infindáveis. No entanto, a promessa da alvorada é constante. As misericórdias renovam-se a cada manhã; mesmo após as noites mais escuras do luto ou da exaustão, o sol do acolhimento volta sempre a brilhar.',
    audioUri: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3',
  },
  {
    id: '3',
    titulo: 'O Passo da Esperança e do Amor',
    musicaInspiracao: 'Your Move',
    artista: 'Yes',
    referenciaBiblica: '1 Coríntios 13:7',
    trechoLetra: '"Don\'t surround yourself with yourself... Initials will open pathways, with loving, yes."',
    textoReflexao:
      'Não te enclausures na tua própria dor. A vida convida-nos a dar um passo de cada vez, permitindo que a paciência e a abertura de coração tracem novos caminhos de luz em meio ao caos.',
    audioUri: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  },
];

export default function TelaDevocionais() {
  const [devocionalAtivo, setDevocionalAtivo] = useState<DevocionalItem>(DEVOCIONAIS_MOCK[0]);
  const [estaOuvindo, setEstaOuvindo] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const animacaoRespiracao = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (estaOuvindo) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animacaoRespiracao, {
            toValue: 1.03,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animacaoRespiracao, {
            toValue: 1,
            duration: 2500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      animacaoRespiracao.stopAnimation();
      animacaoRespiracao.setValue(1);
    }
  }, [estaOuvindo]);

  async function gerenciarAudio(uri: string, iniciar: boolean) {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      if (iniciar) {
        const { sound: novoSom } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true, isLooping: true, volume: 0.7 }
        );
        setSound(novoSom);
      }
    } catch (error) {
      console.log('Erro ao carregar o áudio:', error);
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const alternarFrequencia = async () => {
    const novoEstado = !estaOuvindo;
    setEstaOuvindo(novoEstado);
    await gerenciarAudio(devocionalAtivo.audioUri, novoEstado);
  };

  const selecionarDevocional = async (item: DevocionalItem) => {
    setDevocionalAtivo(item);
    setEstaOuvindo(true);
    await gerenciarAudio(item.audioUri, true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.subtituloHeader}>TRILHA DA ESPERANÇA</Text>
          <Text style={styles.tituloHeader}>Refrigério & Canções</Text>
          <Text style={styles.descricaoHeader}>
            Um espaço para pausar o caos, ouvir o som da esperança e alinhar o ritmo da alma.
          </Text>
        </View>

        <Animated.View
          style={[
            styles.cardDestaque,
            estaOuvindo && styles.cardDestaqueAtivo,
            { transform: [{ scale: animacaoRespiracao }] },
          ]}
        >
          <View style={styles.topoCard}>
            <View style={styles.badgeMusica}>
              <Text style={styles.badgeTexto}>🎵 {devocionalAtivo.musicaInspiracao} — {devocionalAtivo.artista}</Text>
            </View>

            <TouchableOpacity
              style={[styles.botaoOuvir, estaOuvindo && styles.botaoOuvirAtivo]}
              onPress={alternarFrequencia}
            >
              <Text style={styles.textoBotaoOuvir}>
                {estaOuvindo ? '🔊 Em Sintonia' : '▶ Entrar no Ritmo'}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.tituloDestaque}>{devocionalAtivo.titulo}</Text>
          
          <View style={styles.containerCitacao}>
            <Text style={styles.textoCitacao}>{devocionalAtivo.trechoLetra}</Text>
          </View>

          <Text style={styles.textoReflexao}>{devocionalAtivo.textoReflexao}</Text>

          <View style={styles.rodapeBiblico}>
            <Text style={styles.textoBiblico}>📖 {devocionalAtivo.referenciaBiblica}</Text>
          </View>
        </Animated.View>

        <Text style={styles.subtituloSelecione}>OUTRAS CANÇÕES DA TRILHA</Text>

        {DEVOCIONAIS_MOCK.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.cardOpcao,
              devocionalAtivo.id === item.id && styles.cardOpcaoAtivo,
            ]}
            onPress={() => selecionarDevocional(item)}
          >
            <View style={styles.infoOpcao}>
              <Text style={styles.tituloOpcao}>{item.titulo}</Text>
              <Text style={styles.subOpcao}>{item.musicaInspiracao} • {item.artista}</Text>
            </View>
            <Text style={styles.setaOpcao}>
              {devocionalAtivo.id === item.id ? '🔊' : '›'}
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.espacadorFinal} />
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    marginBottom: 20,
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
  cardDestaque: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  cardDestaqueAtivo: {
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  topoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badgeMusica: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    flexShrink: 1,
    marginRight: 8,
  },
  badgeTexto: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '600',
  },
  botaoOuvir: {
    backgroundColor: '#0F172A',
    borderColor: '#38BDF8',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  botaoOuvirAtivo: {
    backgroundColor: '#38BDF8',
  },
  textoBotaoOuvir: {
    color: '#F8FAFC',
    fontSize: 11,
    fontWeight: '700',
  },
  tituloDestaque: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  containerCitacao: {
    borderLeftWidth: 3,
    borderLeftColor: '#38BDF8',
    paddingLeft: 12,
    marginVertical: 10,
  },
  textoCitacao: {
    color: '#CBD5E1',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  textoReflexao: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10,
    marginBottom: 16,
  },
  rodapeBiblico: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  textoBiblico: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '700',
  },
  subtituloSelecione: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  cardOpcao: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardOpcaoAtivo: {
    borderColor: '#38BDF8',
    backgroundColor: '#0F172A',
  },
  infoOpcao: {
    flex: 1,
  },
  tituloOpcao: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  subOpcao: {
    color: '#94A3B8',
    fontSize: 12,
  },
  setaOpcao: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  espacadorFinal: {
    height: 30,
  },
});