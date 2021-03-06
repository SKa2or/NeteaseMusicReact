/**
			 * 事件分发器
			 */
			(function(){
				var env = "dev";
				var lzEvent = function(){
					this.version = "1.0.0";
					this.env = env;
				}

				var list_event = [];

				var log = function(obj){
					if(env == "dev")
						console.log(obj);
				}

				/*添加类型事件*/
				lzEvent.prototype.add = function(type,callback){
					if(typeof callback !== "function"){
						log("callback must be function");
						return ;
					}

					if(list_event[type]){
						list_event[type].push(callback);
					}else{
						list_event[type] = [callback];
					}
				}

				/**移除类型指定事件*/
				lzEvent.prototype.remove = function(type,callbackName){
					if(list_event[type]){
						var arr = list_event[type];
						for(var len = arr.length , i = len - 1 ; i >= 0 ; --i ){
							var name = arr[i].toString().match(/^function([^\(]+?)\(/);
							var funcName = "";
					      	if(name && name[1]){
					        	funcName = name[1].replace(/(^\s*)|(\s*$)/g,"");
					      	}
					      	log(funcName);
							if(funcName === callbackName){
								arr.splice(i,1);
								log(list_event);
								break;
							}
						}
					}
				}

				/**移除类型所有事件*/
				lzEvent.prototype.removeAll = function(type){
					if(list_event[type]){
						list_event[type] = [];
					}
				}

				/*分发事件*/
				lzEvent.prototype.dispatch = function(type,params){
					if(list_event[type]){
						var arr = list_event[type];
						for(var len = arr.length , i = len - 1 ; i >= 0 ; --i ){
							arr[i](params);
						}
					}
				}

				window.lzEvent = window.lzEvent || new lzEvent();
			})();
