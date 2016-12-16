angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
	todoList.todos = [];
	todoList.showTodos = [];
	todoList.todos = restoreList();
	if (todoList.todos.length == 0) 
	{
		todoList.todos.push({text:'Do it.', done:true});
		todoList.todos.push({text:'Just do it.', done:false});
		todoList.todos.push({text:'Don\'t let your dreams be drems.', done:true});
		todoList.todos.push({text:'Yesterday you said tomorrow,', done:false});
		todoList.todos.push({text:'so just do it!', done:true});
		todoList.todos.push({text:'Make your dreams come true!', done:false});
		todoList.todos.push({text:'JUST DO IT!', done:true});
		todoList.todos.push({text:'Some people dream.', done:false});
		todoList.todos.push({text:'SUCCESS!', done:true});
	}
 
	todoList.showTodos = todoList.todos;
    todoList.addTodo = function() {
		if(todoList.todoText.length > 0)
		{
			todoList.todos.push({text:todoList.todoText, done:false});
			todoList.todoText = '';
			todoList.storeList();
		}
    };
 
    todoList.goalCount = function(filtered) {
      var count = 0;
      angular.forEach(filtered, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

 
    todoList.removeDoneTasks = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) 
			todoList.todos.push(todo);
      });
	  todoList.storeList();
    };
	
	todoList.storeList = function() {
		localStorage.clear();
		var tempList = todoList.todos;
		for (var i = 0; i < tempList.length; i++)
		{
			var sTempItem = JSON.stringify(tempList[i]);
			var key = "element_" + i;
			localStorage.setItem(key, sTempItem);
		}
		
	};
	
 function restoreList() {
		var tempList = [];
		var i = 0;
		var key = "element_" + i;
		while (localStorage.getItem(key) != null)
		{
			var sTempItem = localStorage.getItem(key);
			var tempItem = JSON.parse(sTempItem);
			tempList.push({text: tempItem.text, done: tempItem.done});
			i++;
			key = "element_" + i;
		}
		return tempList;
	};
  });