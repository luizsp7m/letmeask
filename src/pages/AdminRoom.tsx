import logoImg from '../assets/logo.svg';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';

import { useHistory, useParams } from 'react-router-dom';

import deleteImg from '../assets/delete.svg';

import '../styles/room.scss';
// import { useAuth } from '../hooks/useAuth';
import Question from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id
  const { title, questions } = useRoom(roomId);
  const history = useHistory();

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="#" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question, index) => {
            return (
              <Question
                key={index}
                content={question.content}
                author={question.author}
              >
                <button 
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="#" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default AdminRoom;