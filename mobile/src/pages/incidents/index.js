import React,{ useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png'
import api from '../../services/api'
import styles from './styles'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const navigation = useNavigation()

  function navigateToDetail(incident){
    navigation.navigate('details',{ incident })
  }

  async function loadIncidents(){
    if(loading){
      return
    }

    if(total > 0 && incidents.length === total){
      return
    }

    setLoading(true)

    const response = await api.get('incidents', { params: { page } }) 
    
    setIncidents([...incidents, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {    
    loadIncidents()
  },[])  
  
  const { container, header, headerText, headerTextBold, title, description } = styles
  const { incidentList, incidentBox, incidentProperty, incidentValue, detailsButton, detailsButtonText } = styles

  return (
    <View style={container}>
      <View style={header}>
        <Image source={logoImg} />
        <Text style={headerText}>
          Total de <Text style={headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={title}>Bem-vindo!</Text>
      <Text style={description}>Escolha um dos casos abaixo e salvar</Text>
    
      <FlatList
        data={incidents}
        style={incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={incidentBox}>
            <Text style={incidentProperty}>ONG:</Text>
            <Text style={incidentValue}>{incident.name}</Text>

            <Text style={incidentProperty}>CASO:</Text>
            <Text style={incidentValue}>{incident.title}</Text>

            <Text style={incidentProperty}>VALOR:</Text>
            <Text style={incidentValue}>{Intl.NumberFormat('pt-br',{
              style: 'currency', 
              currency: 'BRL'
            }).format(incident.value)}</Text>
          
            <TouchableOpacity 
              style={detailsButton} 
              onPress={() => navigateToDetail(incident)} 
            >
              <Text style={detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}