import { useState } from "react";
import { ItemSuggestion } from "./components/ItemSuggestion";
import { getHistoric, setHistoric } from "./storage/historics";

type ProgressType = 'pending' | 'started' | 'done';

function App() {
  const [progress, setProgress] = useState<ProgressType>('pending');
  const [textarea, setTextarea] = useState<string>('');
  const [chat, setChat] = useState<string[]>([]);

  function resetChat() {
    setProgress('pending');
    setChat([]);
  }

  function handleSubmitChat() {
    if (!textarea) return;

    const message = textarea;
    setTextarea('');

    if (progress === 'pending') {
      setHistoric(message);
      setChat(text => [...text, message]);
      setChat(text => [...text, 'Aqui será a pergunta gerada por uma IA']);
      setProgress('started');
      return;
    }

    setChat(text => [...text, message]);
    setChat(text => [...text, 'Aqui será o feedback gerado por uma IA']);
    setProgress('done');
  }

  return (
    <div className="container">
      
      {/* ===== SIDEBAR ===== */}
      <div className="sidebar">
        <details open className="suggestion">
          <summary>Tópicos Sugeridos</summary>
          <ItemSuggestion title="HTML" onClick={() => setTextarea('HTML')} />
          <ItemSuggestion title="CSS" onClick={() => setTextarea('CSS')} />
          <ItemSuggestion title="JavaScript" onClick={() => setTextarea('JavaScript')} />
          <ItemSuggestion title="TypeScript" onClick={() => setTextarea('TypeScript')} />
        </details>

        <details open className="historic">
          <summary>Histórico</summary>
          {getHistoric().map((item, index) => (
            <ItemSuggestion key={index} title={item} onClick={() => setTextarea(item)} />
          ))}
        </details>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="content">
        
        {progress === 'pending' && (
          <div className="box-home">
            <span>Olá, eu sou o</span>
            <h1>Mind <span>Loop</span></h1>
            <p>
              Estou aqui para te ajudar nos seus estudos.
              Selecione um dos tópicos sugeridos ao lado
              ou digite um tópico que deseja estudar para
              começarmos
            </p>
          </div>
        )}

        {progress !== 'pending' && (
          <div className="box-chat">
            {chat[0] && <h1>Você está estudando sobre <span>{chat[0]}</span></h1>}
            {chat[1] && (
              <div className="question">
                <h2>Pergunta</h2>
                <p>{chat[1]}</p>
              </div>
            )}
            {chat[2] && (
              <div className="answer">
                <h2>Sua Resposta</h2>
                <p>{chat[2]}</p>
              </div>
            )}
            {chat[3] && (
              <div className="feedback">
                <h2>Feedback teach<span>.me</span></h2>
                <p>{chat[3]}</p>
                <div className="actions">
                  <button onClick={resetChat}>Estudar novo tópico</button>
                </div>
              </div>
            )}
          </div>
        )}

        {progress !== 'done' && (
          <div className="box-input">
            <textarea
              value={textarea}
              onChange={e => setTextarea(e.target.value)}
              placeholder={progress === 'started' ? "Insira sua resposta..." : "Insira o tema que deseja estudar..."}
            />
            <button onClick={handleSubmitChat}>
              {progress === 'pending' ? 'Enviar Pergunta' : 'Enviar Resposta'}
            </button>
          </div>
        )}

        <footer className="box-footer">
          <p>Mind<span>Loop</span> – Sua mente em constante evolução.
          Onde cada resposta leva a um novo aprendizado.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

