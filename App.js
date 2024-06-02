// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import React from "react";
// import firestore from '@react-native-firebase/firestore';
// import { FlatList, View, ScrollView, Text } from 'react-native';
// import { Appbar, TextInput, Button } from 'react-native-paper';
// import Todo from './todo';
// function App() {
//   const [todo, setTodo] = React.useState('');
//   const [ loading, setLoading ] = React.useState(true);
//   const [ todos, setTodos ] = React.useState([]);
//   const ref = firestore().collection('todos');
//   async function addTodo() {
//     await ref.add({
//       title: todo,
//       complete: false,
//     });
//     setTodo('');
//   }
//   React.useEffect(() => {
//     return ref.onSnapshot(querySnapshot => {
//       const list = [];
//       querySnapshot.forEach(doc => {
//         const { title, complete } = doc.data();
//         list.push({
//           id: doc.id,
//           title,
//           complete,
//         });
//       });
//       setTodos(list);

//       if (loading) {
//         setLoading(false);
//       }
//     });
//   });
//   if (loading) {
//     return null; // or a spinner
//   }
//   return (
//     <View style={{flex:1}}>
//       <Appbar>
//         <Appbar.Content title={'TODOs List'} />
//       </Appbar>
//       <FlatList
//         style={{flex: 1}}
//         data={todos}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => <Todo {...item} />}
//       />
//       <TextInput label={'New Todo'} value={todo} onChangeText={(text)=> setTodo(text)} />
//       <Button onPress={addTodo}>Add TODO</Button>
//     </View>
//   );
// }
// export default App;
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList, View, StyleSheet,ImageBackground,Text } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './todo';

function App() {
  const [todo, setTodo] = React.useState('');
  const [ loading, setLoading ] = React.useState(true);
  const [ todos, setTodos ] = React.useState([]);
  const ref = firestore().collection('todos');
  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo('');
  }

 // mục đích useEffect để quản lý vòng đời của của một component voi react-hood
  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  });

  if (loading) {
    return null; // or a spinner
  }

  return (
<ImageBackground source={require("./img/eef16750915a90f94cd86845653d90f1.jpg")} style={styles.backgroundImage}>
    <View style={[styles.container]}>
      <Appbar>
        <Appbar.Content title={'Tất cả việc cần làm!'} />
      </Appbar>
      <FlatList 
    style={{flex: 1, color: 'white', }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item}/> }
      />
      <TextInput label={'Thêm việc...'} value={todo} onChangeText={(text) => setTodo(text)} style={{
        width:"90%",
        borderRadius:10,
        marginLeft:15,
      }} />
      <Button onPress={addTodo}><Text style={styles.buttonText}>Thêm ghi chú</Text></Button> 
    </View>
    </ImageBackground>

  );
}
export default App;
const styles = StyleSheet.create({
  container :{
      flex : 1,
  },
  backgroundImage: {
    flex: 1, // Để nói rằng `ImageBackground` sẽ chiếm toàn bộ không gian của cha nó
    resizeMode: 'cover', // Để phù hợp với kích thước màn hình và che đậy toàn bộ không gian
  },
  buttonText: {
    color: 'white', // Đặt màu chữ của nút thành màu trắng
    fontSize: 16,
    textAlign: 'center',
  },

})
