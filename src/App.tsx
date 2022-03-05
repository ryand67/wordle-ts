import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import filter from 'bad-words';

function App() {
	const [userGuess, setUserGuess] = useState<string>('');
	const Filter = new filter();
	let wordList: string[] = [];
	const inputRef = useRef<HTMLInputElement>(null!);

	const handleInputChange = (): void => {
		setUserGuess(inputRef.current.value);
	};

	useEffect(() => {
		inputRef?.current?.focus();
	}, [inputRef]);

	useEffect(() => {
		(async () => {
			return await axios.get('https://random-word-api.herokuapp.com/all');
		})().then(({ data }) => {
			wordList = data.filter(
				(word: string) => word.length === 5 && !Filter.isProfane(word)
			);
		});
	}, []);

	return (
		<div className="App">
			<input type="text" ref={inputRef} onChange={handleInputChange} />
			{userGuess}
		</div>
	);
}

export default App;
