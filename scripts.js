// LYRIC INFO
const songLyricsArray = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

// Initial Redux State
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition:0
}

// REDUCER WILL GO HERE
const reducer=(state=initialState, action) => {
  let newState
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {
        songLyricsArray:state.songLyricsArray,
        arrayPosition:newArrayPosition,
      }
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
    return state;
  }
}

// JEST TESTS + SETUP WILL GO HERE
const {expect} = window;

expect(reducer(initialState, {type:null})).toEqual(initialState);

expect(reducer(initialState, {type:'NEXT_LYRIC'})).toEqual({songLyricsArray:songLyricsArray, arrayPosition: 1})

expect(reducer({songLyricsArray: songLyricsArray, arrayPosition: 1,}, { type: 'RESTART_SONG'})).toEqual(initialState);

// Redux Store
const {createStore} = Redux;
const store = createStore(reducer);
console.log(store.getState());

//Rendering state in DOM
const renderLyrics = () => {
  // defines a lyricsDisplay constant referring to the div with a 'lyrics' ID in index.html
  const lyricsDisplay = document.getElementById('lyrics');
  // if there are already lyrics in this div, remove them one-by-one until it is empty:
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  // Locates the song lyric at the current arrayPosition:
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  // Creates DOM text node containing the song lyric identified in line above:
  const renderedLine = document.createTextNode(currentLine);
  // Adds text node created in line above to 'lyrics' div in DOM
  document.getElementById('lyrics').appendChild(renderedLine);
}

// runs renderLyrics() method from above when page is finished loading.
// window.onload is HTML5 version of jQuery's $(document).ready()
window.onload = () => {
  renderLyrics();
}
//Click Listener
const userClick = () => {
  const currentState = store.getState();
  if (currentState.arrayPosition === currentState.songLyricsArray.length-1) {
    store.dispatch({type: 'RESTART_SONG'})
  } else {
    store.dispatch({ type: 'NEXT_LYRIC'});
  }
}

// Subscribe to redux Store
store.subscribe(renderLyrics);
