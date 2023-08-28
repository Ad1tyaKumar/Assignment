import React, { useState } from 'react'
import { CheckCircleOutline, UnfoldMore, RadioButtonUnchecked } from '@mui/icons-material';
import './App.css'

const App = () => {

  const [position, setPosition] = useState(1);
  const handleMouseDrag = (e) => {


    /*I calculated the values of clientY on which the scroller should move to a position, by 
    console logging it, then I logged the height and divided it by the constant 
    value of clientY so I got general formula on which it should move to a particular
    position then I multiplied it with h which will vary on the screen dimensions so it 
    will work for any screen.
    */
    const h = document.getElementsByClassName('scrollerDiv')[0].clientHeight
    console.log(h);
    console.log(e.clientY, h);
    const handleMouseMove = (e) => {
      if (e.clientY < 0.3125 * h) {
        setPosition(1);
      } else if (e.clientY > 0.3125 * h && e.clientY < 0.625 * h) {
        setPosition(2);
      } else if (e.clientY > 0.625 * h && e.clientY < 0.885 * h) {
        setPosition(3);
      } else if (e.clientY > 0.89 * h) {
        setPosition(4);
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

  }

  const handleMouseWheel = (e) => {
    if (e.deltaY > 0 && position < 4) {
      setPosition(position + 1);
    } else if (e.deltaY < 0 && position > 1) {
      setPosition(position - 1);
    }
  };



  return (
    <div className='mainDiv' onWheel={handleMouseWheel}>
      <div className='cornerContent'>
        {position}
      </div>
      <div className='scrollerDiv'>
        {
          position === 1 ? <div onMouseDown={handleMouseDrag} className={'unfoldIcon'}>
            <div className='tags'>
              {`Text${position}`}
            </div>
            <UnfoldMore />
          </div> :
            <CheckCircleOutline onClick={() => setPosition(1)} className='tick' />
        }
        <div className={position > 1 ? `verticalBar redBar` : `verticalBar`}>
        </div>
        {
          position === 2 ? <div onMouseDown={handleMouseDrag} className='unfoldIcon'>
            <div className='tags'>
              {`Text${position}`}
            </div>
            <UnfoldMore />
          </div> : position > 2 ?
            <CheckCircleOutline onClick={() => setPosition(2)} className='tick' />
            :
            <RadioButtonUnchecked onClick={() => setPosition(2)} className='circle' />
        }
        <div className={position > 2 ? 'verticalBar redBar' : 'verticalBar'}>
        </div>
        {
          position === 3 ? <div onMouseDown={handleMouseDrag} className='unfoldIcon'>
            <div className='tags'>
              {`Text${position}`}
            </div>
            <UnfoldMore />
          </div> : position > 3 ?

            <CheckCircleOutline onClick={() => setPosition(3)} className='tick' />
            :
            <RadioButtonUnchecked onClick={() => setPosition(3)} className='circle' />
        }
        <div className={position > 3 ? 'verticalBar redBar' : 'verticalBar'}>
        </div>
        {
          position === 4 ? <div onMouseDown={handleMouseDrag} className='unfoldIcon'>
            <div className='tags'>
              {`Text${position}`}
            </div>
            <UnfoldMore />
          </div> : <RadioButtonUnchecked onClick={() => setPosition(4)} className='circle' />
        }
      </div>
      <div className='cornerContent'>
        {position}
      </div>
    </div>
  )
}

export default App
