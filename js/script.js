const filterByType = (type, ...values) => values.filter(value => typeof value === type), //объявяление стрелочной функции, которая фильтрует элементы по их типу

	hideAllResponseBlocks = () => { // объявление функции hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //объявление переменной, в которой будет находиться массив из элементов колеекции элементов 'div.dialog__response-block'
		responseBlocksArray.forEach(block => block.style.display = 'none'); //перебор массива конструкции форИч + добавление к каждомау элементу массива block.style.display = 'none'
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // объявление функции showResponseBlock с тремя параметрами
		hideAllResponseBlocks(); //вызов функции hideAllResponseBlocks
		document.querySelector(blockSelector).style.display = 'block'; // присваивания свойства block элементу с селектором blockSelector
		if (spanSelector) { //вызов условия : если spanSelector true
			document.querySelector(spanSelector).textContent = msgText; //то присваиваем значение переменной msgText spanSelector-у
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //объявление функции showError с параметром msgText с вызовом showResponseBlock

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //объявление функции showResults с параметром msgText с вызовом showResponseBlock

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //объявление функции showNoResults с параметром msgText с вызовом showResponseBlock

	tryFilterByType = (type, values) => { // объявление стрелочной функции tryFilterByType с двумя параметрами
		try { //запуск конструкции try catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //присваиваем valuesArray значение метода eval, котрый запускает функцию filterByType и принимает значения путем делегирования в результате чего меотд join объединяет эти значение в строку
			const alertMsg = (valuesArray.length) ? //присваиваем alertMsg данные + с помощью тернарного оператора проверяем условие, если длина строки valuesArray больше 0 
				`Данные с типом ${type}: ${valuesArray}`: // то alertMsg присваиваем данные Данные с типом ${type}: ${valuesArray}`
				`Отсутствуют данные типа ${type}`; // если нет, то 	`Отсутствуют данные типа ${type}`
			showResults(alertMsg); // вызываем функцию showResults и передаем туда значение alertMsg
		} catch (e) { //выполнение catch, при условии, что в try ошибка
			showError(`Ошибка: ${e}`); //вызов функции showError
		}
	};

const filterButton = document.querySelector('#filter-btn'); // поиск эелемента с айди #filter-btn

filterButton.addEventListener('click', e => { //навешиваем обраббтчик событий 'сlick' на элемент filterButton
	const typeInput = document.querySelector('#type'); // поиоск элемента с айди type
	const dataInput = document.querySelector('#data'); // поиск элемента с id data

	if (dataInput.value === '') { //условие, если значение dataInput равно пустой строке
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // то устанавливаем к input специальное сообщение 'Поле не должно быть пустым!'
		showNoResults(); //вызов функции
	} else { // если условие неверно
		dataInput.setCustomValidity(''); // то станавливаем к input специальное пустое сообщение
		e.preventDefault(); //сбрасываем обычное поведение браузера при нажатии на кнопку
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //вызов функции tryFilterByType с параметрами, которые убирают лишние пробелы в начале ив конце строки в инпутах
	}
});

