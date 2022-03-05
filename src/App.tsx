import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import filter from 'bad-words';
import { GlobalContext } from './utils/GlobalContext';

function App() {
	const [userGuess, setUserGuess] = useState<string>('');
	const [tryCount, setTryCount] = useState<number>(0);
	const Filter = new filter();
	let wordList: string[] = [];
	const inputRef = useRef<HTMLInputElement>(null!);

	const handleInputChange = (): void => {
		setUserGuess(inputRef.current.value);
	};

	useEffect(() => {
		inputRef.current.focus();
		(async () => {
			return await axios.get('https://random-word-api.herokuapp.com/all');
		})().then(({ data }) => {
			wordList = data.filter(
				(word: string) => word.length === 5 && !Filter.isProfane(word)
			);
		});
	}, []);

	const contextValues = useMemo(() => {
		return {
			userGuess,
			tryCount,
		};
	}, [userGuess, tryCount]);

	return (
		<GlobalContext.Provider value={contextValues}>
			<div className="App">
				<input type="text" ref={inputRef} onChange={handleInputChange} />
				{userGuess}
			</div>
		</GlobalContext.Provider>
	);
}

export default App;
