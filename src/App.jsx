import './App.css';
import { useEffect, useState } from 'react';
import { client, databases, DB_ID, COLLECTION_ID } from "./lib/appwrite";
import Question from './components/Question';
import Footer from './components/Footer';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestionsFromDB();
    
    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${COLLECTION_ID}.documents`, 
      (res) => {
        console.log(res);

        if (res.events.includes("databases.*.collections.*.documents.*.update")) {
          setQuestions((prevQuestions) => {
            return prevQuestions.map((question) => {
              if (question.$id !== res.payload.$id) {
                return question;
              }
              return res.payload;
            });
          });
          console.log('Updated Question');
        }
      }
    );

    return () => {
      unsubscribe();
    };

  }, []);

  async function getQuestionsFromDB() {
    const questions = await databases.listDocuments(DB_ID, COLLECTION_ID);
    setQuestions(questions.documents);
  }

  return (
    <main className='App flex flex-col justify-between'>
      {/* <div className='font1 text-center'>Realtime Voting App</div> */}     

      <div className="container max-w-3xl mx-auto px-2 py-5">
        {questions.map((question) => (
          <Question key={question.$id} data={question} />
        ))}
      </div>

      
      <Footer />
    </main>
  )
}

export default App
