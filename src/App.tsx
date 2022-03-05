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

		document.addEventListener('click', (): void => {
			inputRef.current.focus();
		});

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
			<div className="w-screen h-screen bg-zinc-900 flex flex-col justify-center items-center">
				<input
					className="fixed opacity-0"
					type="text"
					maxLength={5}
					ref={inputRef}
					onChange={handleInputChange}
				/>
				<p className="text-white">{userGuess}</p>
			</div>
		</GlobalContext.Provider>
	);
}

export default App;
