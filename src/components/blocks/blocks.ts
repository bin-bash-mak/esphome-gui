import { BlockTypes } from "./types";

export default [
  // {
  // 	type: BlockTypes.GlobalDataSet,
  // 	message0: 'Задать переменную %1 = %2',
  // 	args0: [
  // 		{
  // 			type: 'field_input',
  // 			name: 'variableName',
  // 		},
  // 		{
  // 			type: 'field_input',
  // 			name: 'variableValue',
  // 		},
  // 	],
  // 	previousStatement: true,
  // 	nextStatement: true,
  // 	colour: 123,
  // },
  // {
  // 	type: BlockTypes.GlobalDataGet,
  // 	message0: 'Взять переменную %1',
  // 	args0: [
  // 		{
  // 			type: 'field_input',
  // 			name: 'variableName',
  // 		},
  // 	],
  // 	previousStatement: true,
  // 	nextStatement: true,
  // 	colour: 123,
  // },
  // {
  // 	type: BlockTypes.AttributeChanger,
  // 	message0: 'У элемента %1 изменить атрибут %2 = %3',
  // 	args0: [
  // 		{
  // 			type: 'field_dropdown',
  // 			name: 'elementId',
  // 			options: [
  // 				['button1', 'button1'],
  // 				['button2', 'button2'],
  // 				['checkbox1', 'checkbox1'],
  // 				['checkbox2', 'checkbox2'],
  // 			],
  // 		},
  // 		{
  // 			type: 'field_input',
  // 			name: 'attributeName',
  // 		},
  // 		{
  // 			type: 'field_input',
  // 			name: 'attributeValue',
  // 		},
  // 	],
  // 	previousStatement: true,
  // 	nextStatement: true,
  // 	colour: 311,
  // },
  {
    type: "test",
    message0: "У элемента %1 изменить атрибут %2 = %3",
    args0: [
      {
        type: "field_dropdown",
        name: "elementId",
        options: [
          ["button1", "button1"],
          ["button2", "button2"],
          ["checkbox1", "checkbox1"],
          ["checkbox2", "checkbox2"],
          ["smartStepForm1", "smartStepForm1"],
        ],
      },
      {
        type: "field_input",
        name: "attributeName",
      },
      {
        type: "input_value",
        name: "attributeValue",
      },
    ],
    previousStatement: true,
    nextStatement: true,
    colour: 311,
  },
  {
    type: "testGGGGG",
    message0: "У элемента %1 взять атрибут %2",
    args0: [
      {
        type: "field_dropdown",
        name: "elementId",
        options: [
          ["button1", "button1"],
          ["button2", "button2"],
          ["checkbox1", "checkbox1"],
          ["checkbox2", "checkbox2"],
        ],
      },
      {
        type: "field_input",
        name: "attributeName",
      },
    ],
    output: "Number",
    colour: 215,
  },
  {
    type: BlockTypes.PageChanger,
    message0: "Перейти на страницу %1",
    args0: [
      {
        type: "field_dropdown",
        name: "elementId",
        options: [
          ["index", "index"],
          ["page1", "page1"],
          ["page2", "page2"],
        ],
      },
    ],
    previousStatement: true,
    // nextStatement: true,
    colour: 311,
  },
  {
    type: "navigateBack",
    message0: "Вернуться на страницу %1",
    args0: [
      {
        type: "field_dropdown",
        name: "elementId",
        options: [
          ["index", "index"],
          ["page1", "page1"],
          ["page2", "page2"],
        ],
      },
    ],
    previousStatement: true,
    // nextStatement: true,
    colour: 311,
  },
  {
    type: BlockTypes.EventTrigger,
    message0: "У элемента %1 слушать событие %2 %3",
    args0: [
      {
        type: "field_dropdown",
        name: "elementId",
        options: [
          ["button1", "button1"],
          ["button2", "button2"],
          ["checkbox1", "checkbox1"],
          ["checkbox2", "checkbox2"],
          ["smartStepFrom", "smartStepFrom"],
        ],
      },
      {
        type: "field_dropdown",
        name: "eventName",
        options: [
          ["onClick", "onClick"],
          ["onBlur", "onBlur"],
          ["onChangeValue", "onChangeValue"],
          ["onClear", "onClear"],
          ["onBackButtonClick", "onBackButtonClick"],
          ["onForwardButtonClick", "onForwardButtonClick"],
        ],
      },
      {
        type: "input_statement",
        name: "inputValue",
      },
    ],
    // previousStatement: true,
    // nextStatement: true,
    colour: 55,
    tooltip: "Это мой кастомный блок, в который можно класть другие блоки",
    helpUrl: "http://www.example.com",
  },
  {
    type: "string_length",
    message0: "length of %1",
    args0: [
      {
        type: "field_input",
        name: "VALUE",
        check: "String",
      },
    ],
    output: "Number",
    colour: 160,
    tooltip: "Returns number of letters in the provided text.",
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
    function: "function myCustomBlock() { alert('pizda')}",
  },
  // {
  // 	type: BlockTypes.PageEvent,
  // 	message0: '%1 %2',
  // 	args0: [
  // 		{
  // 			type: 'field_dropdown',
  // 			name: 'EVENT_NAME',
  // 			options: [
  // 				['onLoad', 'onLoad'],
  // 				['onShow', 'onShow'],
  // 				['onRecover', 'onRecover'],
  // 				['onDestroy', 'onDestroy'],
  // 			],
  // 		},
  // 		{
  // 			type: 'input_statement',
  // 			name: 'inputValue',
  // 		},
  // 	],
  // 	colour: 123,
  // },
  // {
  // 	type: 'control_operator',
  // 	message0: '%1 %2 %3',
  // 	// previousStatement: null,
  // 	// nextStatement: null,
  // 	args0: [
  // 		{
  // 			type: 'field_input',
  // 			name: 'OP',
  // 			text: 'ЕСЛИ',
  // 		},
  // 		{
  // 			type: 'input_value',
  // 			name: 'A',
  // 		},
  // 		{
  // 			type: 'input_statement',
  // 			name: 'B',
  // 		},
  // 	],
  // },
];
