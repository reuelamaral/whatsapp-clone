import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import MessageItem from './MessageItem';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';

export default () => {

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([{}, {}, {}]);

  const handleEmojiClick = (e, emojiObject) => {
    setText( text + emojiObject.emoji );
  }

  const handleOpenEmoji =  () => {
    setEmojiOpen(true);
  }

  const handleCloseEmoji =  () => {
    setEmojiOpen(false);
  }

  const handleMicClick = () => {
    if(recognition !== null ) {

      recognition.onstart = () => {
        setListening(true);
      }
      recognition.onend = () => {
        setListening(false);
      }
      recognition.onresult = (e) => {
        setText( e.results[0][0].transcript );
      }

      recognition.start();

    }
  }

  const handleSendClick = () => {
    
  }

  return(
    <div className="chatWindow">
      <div className="chatWindow--header">

        <div className="chatWindow--headerinfo">
          <img className="chatWindow--avatar" src="https://leadsdeconsorcio.com.br/blog/wp-content/uploads/2019/11/04-1.jpg" />
          <div className="chatWindow--name">Fulano de Tal</div>
        </div>

        <div className="chatWindow--headerbuttons">

          <div className="chatWindow--btn">
            <SearchIcon style={{color: '#919191'}} />

          </div>
          <div className="chatWindow--btn">
            <AttachFileIcon style={{color: '#919191'}} />

          </div>
          <div className="chatWindow--btn">
            <MoreVertIcon style={{color: '#919191'}} />

          </div>
        
        </div>

      </div>
      <div className="chatWindow--body">
        {list.map((item, key)=>(
          <MessageItem 
            key={key}
            data={item}
          />
        ))}
      </div>

      <div 
      className="chatWindow--emojiarea" 
      style={{height: emojiOpen ? '200px' : '0px'}}>
        <EmojiPicker  
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
        />
      </div>

      <div className="chatWindow--footer">

        <div className="chatWindow--pre">

          <div 
          className="chatWindow--btn"
          onClick={handleCloseEmoji}
          style={{width: emojiOpen ? '40px': '0px'}}
          >
            <CloseIcon style={{color: '#919191'}} />

          </div>
          <div 
          className="chatWindow--btn" 
          onClick={handleOpenEmoji}>
            <InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}} />

          </div>
        
        </div>
        <div className="chatWindow--inputarea">
          <input 
          className="chatWindow--input" 
          type="text" 
          placeholder="Digite uma mensagem"
          value={text}
          onChange={e=>setText(e.target.value)}
          />
        
        </div>
        <div className="chatWindow--pos">

          { text === '' &&
            <div onClick={handleMicClick} className="chatWindow--btn">
              <MicIcon style={{color: listening ? '#126ECE' : '#919191'}} />
            </div>
          } 
          { text !== '' &&
            <div onClick={handleSendClick} className="chatWindow--btn">
              <SendIcon style={{color: '#919191'}} />
            </div>
          }
        </div>

      </div>
    </div>
  );
}