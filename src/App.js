
import './App.css';
import { CreateContainer, Header, MainContainer } from './components';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useStateValue } from './context/StateProvider';
import { getAllItems } from './utils/firebaseFunctions';
import { useEffect } from 'react';
import { actionType } from './context/reducer';



// w-screen h-screen flex items-center justify-center text-blue-600

function App() {

const [{item}, dispatchEvent] = useStateValue();

const fetchData = async () => {
  await getAllItems().then((data) => {
    // console.log(data);
    dispatchEvent({
      type: actionType.SET_ITEM,
      item : data,
  })
  })
}

useEffect(() => {
  fetchData();
}, []);


  return (

    <AnimatePresence wait>
    <div className="w-screen h-auto flex flex-col bg-primary" >
      
      <div>
        <Header/>
        <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
          <Routes>
            <Route path="/*" element={<MainContainer/>} />
            <Route path="/createItem" element={<CreateContainer/>} />
          </Routes>
        </main>
      </div>
      

    </div>
    </AnimatePresence>
  );
}

export default App;
