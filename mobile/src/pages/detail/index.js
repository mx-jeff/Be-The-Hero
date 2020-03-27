import React,{ useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { Image, Text, View, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Detail() {
  const navitagion = useNavigation()
  const route = useRoute()

  const incident = route.params.incident

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar o caso ${incident.title} no valor de ${Intl.NumberFormat('pt-br',{style: 'currency', currency: 'BRL'}).format(incident.value)}}`

  function navigateBack(){
    navitagion.goBack()
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message 
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  const{ 
    container, 
    header, 
    incidentBox, 
    incidentProperty, 
    incidentValue, 
    contactBox,  
    heroTitle, 
    heroDescription,
    actions,
    action,
    actionText 
  } = styles
  
  return (
    <View style={container}>
      <View style={header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={incidentBox}>
        <Text style={[incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={incidentProperty}>CASO:</Text>
        <Text style={incidentValue}>{incident.description}</Text>

        <Text style={incidentProperty}>VALOR:</Text>
        <Text style={incidentValue}>{Intl.NumberFormat('pt-br',{
          style: 'currency', 
          currency: 'BRL'
        }).format(incident.value)}</Text>      
      </View>

      <View style={contactBox}>
        <Text style={heroTitle}>Salve o dia!</Text>
        <Text style={heroTitle}>Seja o heroi desse caso.</Text>
      
        <Text style={heroDescription}>Entre em contato:</Text>
        
        <View style={actions}>
          <TouchableOpacity style={action} onPress={sendWhatsapp}>
            <Text style={actionText}>Whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={action} onPress={sendMail}>
            <Text style={actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}