angular.module('todoApp', [])
  .controller('TodoListController', function() {
    var todoList = this;
	todoList.todos = [];
	todoList.todos = restoreList();
	if (todoList.todos.length == 0) 
	{
		todoList.todos.push({text:'learn angular', done:true});
		todoList.todos.push({text:'build an angular app', done:false});
	}
 
    todoList.addTodo = function() {
		if(todoList.todoText.length > 0)
		{
			todoList.todos.push({text:todoList.todoText, done:false});
			todoList.todoText = '';
			todoList.storeList();
		}
    };
 
    todoList.goalCount = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
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
		todoList.storeList();
      });
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