import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const lecon1 = 'cmnyshd9g000h5jp6toaegcro'
const lecon2 = 'cmnyshdd8000j5jp6jr5sr0og'

const exercices = [
  { lessonId: lecon1, order: 4, question: "Que signifie IA ?", answer: "Intelligence Artificielle", explanation: "IA = Intelligence Artificielle", choices: ["Intelligence Artificielle","Information Automatique","Interface Avancée","Intégration Algorithmique"] },
  { lessonId: lecon1, order: 5, question: "Quel est un exemple d'IA ?", answer: "Un assistant vocal", explanation: "Siri, Alexa sont des IA", choices: ["Une calculatrice","Un assistant vocal","Un four micro-ondes","Une lampe connectée"] },
  { lessonId: lecon1, order: 6, question: "L'IA peut-elle apprendre ?", answer: "Oui grâce au machine learning", explanation: "Le ML permet à l'IA d'apprendre", choices: ["Non jamais","Oui grâce au machine learning","Seulement si programmée manuellement","Uniquement les robots"] },
  { lessonId: lecon1, order: 7, question: "Qui a inventé le terme IA ?", answer: "John McCarthy", explanation: "John McCarthy a inventé le terme en 1956", choices: ["Alan Turing","John McCarthy","Elon Musk","Bill Gates"] },
  { lessonId: lecon1, order: 8, question: "L'IA est-elle consciente ?", answer: "Non, elle simule l'intelligence", explanation: "L'IA simule mais n'est pas consciente", choices: ["Oui toujours","Non, elle simule l'intelligence","Seulement les plus avancées","On ne sait pas encore"] },
  { lessonId: lecon2, order: 4, question: "Où trouve-t-on l'IA au quotidien ?", answer: "Dans nos téléphones", explanation: "L'IA est partout : Netflix, Google Maps...", choices: ["Uniquement dans les labos","Dans nos téléphones","Seulement dans les usines","Dans les avions militaires"] },
  { lessonId: lecon2, order: 5, question: "Netflix utilise l'IA pour ?", answer: "Recommander des contenus", explanation: "Le moteur de recommandation de Netflix est une IA", choices: ["Filmer des séries","Recommander des contenus","Traduire les sous-titres","Compresser les vidéos"] },
  { lessonId: lecon2, order: 6, question: "Google Maps utilise l'IA pour ?", answer: "Prévoir le trafic", explanation: "L'IA analyse les données de trafic en temps réel", choices: ["Dessiner les cartes","Prévoir le trafic","Prendre des photos","Mesurer les distances"] },
  { lessonId: lecon2, order: 7, question: "Les filtres Instagram sont ?", answer: "De l'IA appliquée aux images", explanation: "Les filtres utilisent la vision par ordinateur", choices: ["De simples filtres colorés","De l'IA appliquée aux images","Des effets manuels","Des plugins Adobe"] },
  { lessonId: lecon2, order: 8, question: "La reconnaissance faciale sert à ?", answer: "Déverrouiller ton téléphone", explanation: "Face ID d'Apple utilise la reconnaissance faciale", choices: ["Dessiner des visages","Déverrouiller ton téléphone","Améliorer les selfies","Créer des avatars"] },
]

async function main() {
  for (const ex of exercices) {
    await prisma.exercise.create({
      data: {
        lessonId: ex.lessonId,
        type: 'qcm',
        question: ex.question,
        explanation: ex.explanation,
        order: ex.order,
        options: {
          create: ex.choices.map((text, i) => ({
            text,
            isCorrect: text === ex.answer,
            order: i
          }))
        }
      }
    })
    console.log(`✅ ${ex.question}`)
  }
  await prisma.$disconnect()
  console.log('Terminé !')
}

main()