module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "c8f4ba6ef352f42a67d0";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://0.0.0.0:8080/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _assertThisInitialized; });\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _classCallCheck; });\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _createClass; });\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _defineProperty; });\nfunction _defineProperty(obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _getPrototypeOf; });\nfunction _getPrototypeOf(o) {\n  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _inherits; });\n/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(subClass, superClass);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _objectSpread; });\n/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n    var ownKeys = Object.keys(source);\n\n    if (typeof Object.getOwnPropertySymbols === 'function') {\n      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {\n        return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n      }));\n    }\n\n    ownKeys.forEach(function (key) {\n      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]);\n    });\n  }\n\n  return target;\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _possibleConstructorReturn; });\n/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js\");\n/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js\");\n\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(self);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _setPrototypeOf; });\nfunction _setPrototypeOf(o, p) {\n  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _typeof; });\nfunction _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nfunction _typeof(obj) {\n  if (typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\") {\n    _typeof = function _typeof(obj) {\n      return _typeof2(obj);\n    };\n  } else {\n    _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : _typeof2(obj);\n    };\n  }\n\n  return _typeof(obj);\n}\n\n//# sourceURL=webpack:///./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/typeof.js?");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \" + item[2] + \"{\" + content + \"}\";\n      } else {\n        return content;\n      }\n    }).join(\"\");\n  }; // import a list of modules into the list\n\n\n  list.i = function (modules, mediaQuery) {\n    if (typeof modules === \"string\") modules = [[null, modules, \"\"]];\n    var alreadyImportedModules = {};\n\n    for (var i = 0; i < this.length; i++) {\n      var id = this[i][0];\n      if (typeof id === \"number\") alreadyImportedModules[id] = true;\n    }\n\n    for (i = 0; i < modules.length; i++) {\n      var item = modules[i]; // skip already imported module\n      // this implementation is not 100% perfect for weird media query combinations\n      //  when a module is imported multiple times with different media queries.\n      //  I hope this will never occur (Hey this way we have smaller bundles)\n\n      if (typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n        if (mediaQuery && !item[2]) {\n          item[2] = mediaQuery;\n        } else if (mediaQuery) {\n          item[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n        }\n\n        list.push(item);\n      }\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || '';\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n  return '/*# ' + data + ' */';\n}\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function (updatedModules, renewedModules) {\n  var unacceptedModules = updatedModules.filter(function (moduleId) {\n    return renewedModules && renewedModules.indexOf(moduleId) < 0;\n  });\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  if (unacceptedModules.length > 0) {\n    log(\"warning\", \"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\");\n    unacceptedModules.forEach(function (moduleId) {\n      log(\"warning\", \"[HMR]  - \" + moduleId);\n    });\n  }\n\n  if (!renewedModules || renewedModules.length === 0) {\n    log(\"info\", \"[HMR] Nothing hot updated.\");\n  } else {\n    log(\"info\", \"[HMR] Updated modules:\");\n    renewedModules.forEach(function (moduleId) {\n      if (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n        var parts = moduleId.split(\"!\");\n        log.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n        log(\"info\", \"[HMR]  - \" + moduleId);\n        log.groupEnd(\"info\");\n      } else {\n        log(\"info\", \"[HMR]  - \" + moduleId);\n      }\n    });\n    var numberIds = renewedModules.every(function (moduleId) {\n      return typeof moduleId === \"number\";\n    });\n    if (numberIds) log(\"info\", \"[HMR] Consider using the NamedModulesPlugin for module names.\");\n  }\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n  var shouldLog = logLevel === \"info\" && level === \"info\" || [\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\" || [\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\";\n  return shouldLog;\n}\n\nfunction logGroup(logFn) {\n  return function (level, msg) {\n    if (shouldLog(level)) {\n      logFn(msg);\n    }\n  };\n}\n\nmodule.exports = function (level, msg) {\n  if (shouldLog(level)) {\n    if (level === \"info\") {\n      console.log(msg);\n    } else if (level === \"warning\") {\n      console.warn(msg);\n    } else if (level === \"error\") {\n      console.error(msg);\n    }\n  }\n};\n/* eslint-disable node/no-unsupported-features/node-builtins */\n\n\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function (level) {\n  logLevel = level;\n};\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\n/*globals __resourceQuery */\nif (true) {\n  var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\n  var log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n  var checkForUpdate = function checkForUpdate(fromUpdate) {\n    if (module.hot.status() === \"idle\") {\n      module.hot.check(true).then(function (updatedModules) {\n        if (!updatedModules) {\n          if (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n          return;\n        }\n\n        __webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\n        checkForUpdate(true);\n      }).catch(function (err) {\n        var status = module.hot.status();\n\n        if ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n          log(\"warning\", \"[HMR] Cannot apply update.\");\n          log(\"warning\", \"[HMR] \" + (err.stack || err.message));\n          log(\"warning\", \"[HMR] You need to restart the application!\");\n        } else {\n          log(\"warning\", \"[HMR] Update failed: \" + (err.stack || err.message));\n        }\n      });\n    }\n  };\n\n  setInterval(checkForUpdate, hotPollInterval);\n} else {}\n/* WEBPACK VAR INJECTION */}.call(this, \"?300\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \".App {\\n  text-align: center;\\n}\\n\\n.App-logo {\\n  animation: App-logo-spin infinite 20s linear;\\n  height: 40vmin;\\n  pointer-events: none;\\n}\\n\\n.App-header {\\n  background-color: #282c34;\\n  min-height: 100vh;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n  font-size: calc(10px + 2vmin);\\n  color: white;\\n}\\n\\n.App-link {\\n  color: #61dafb;\\n}\\n\\n@keyframes App-logo-spin {\\n  from {\\n    transform: rotate(0deg);\\n  }\\n  to {\\n    transform: rotate(360deg);\\n  }\\n}\\n\\n* {\\n  margin: 0;\\n  padding: 0;\\n  text-rendering: optimizeLegibility !important;\\n  -webkit-font-smoothing: antialiased !important;\\n}\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\np,\\nul,\\nol input[type=\\\"number\\\"]::-webkit-inner-spin-button,\\ninput[type=\\\"number\\\"]::-webkit-outer-spin-button {\\n  -webkit-appearance: none !important;\\n  margin: 0;\\n}\\na {\\n  text-decoration: none !important;\\n}\\n.pad-0 {\\n  padding-left: 0 !important;\\n  padding-right: 0 !important;\\n}\\nh1 {\\n  font-size: 40px;\\n  color: red;\\n  padding-top: 200px;\\n}\\n.header {\\n  background-color: #e83f0b;\\n  padding: 12px;\\n  /* height: 63px; */\\n}\\n.container {\\n  width: 80%;\\n  margin: 0 auto;\\n}\\n.header .logo {\\n  flex: 1;\\n}\\n.navlinks {\\n  flex: 2;\\n}\\n.header-inner {\\n  display: flex;\\n}\\n.navlinks ul {\\n  text-align: right;\\n  margin-top: 3px;\\n  height: 42px;\\n  margin-bottom: 0;\\n}\\n.navlinks ul li {\\n  list-style-type: none;\\n  display: inline-block;\\n  vertical-align: middle;\\n  margin-left: 20px;\\n  height: 40px;\\n  line-height: 39px;\\n  position: relative;\\n}\\n.navlinks ul li h3 {\\n  width: 40px;\\n  height: 40px;\\n  overflow: hidden;\\n  border-radius: 50%;\\n  margin: 0;\\n  cursor: pointer;\\n}\\n.navlinks ul li h3 img {\\n  width: 100%;\\n}\\n.navlinks ul li a {\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  color: #fff;\\n  cursor: pointer;\\n}\\n.logo {\\n  padding-top: 9px;\\n  text-align: left;\\n}\\n.logo a {\\n  text-decoration: none;\\n  color: #fff;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  font-size: 22px;\\n}\\n.banner {\\n  height: 300px;\\n  overflow: hidden;\\n}\\n.banner img {\\n  width: 100%;\\n}\\n.eventCategoryHolder p {\\n  font-family: \\\"Roboto\\\", sans-serif;\\n}\\n.eventCategoryHolder h3 {\\n  font-size: 30px;\\n  font-family: \\\"Roboto\\\", sans-serif;\\n  padding-top: 50px;\\n  margin-bottom: 20px;\\n}\\n.card-holder {\\n  transition: all 0.3s ease;\\n  margin: 5px;\\n}\\n.card-holder img {\\n  width: 100%;\\n}\\n.card-text {\\n  position: absolute;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n  background: linear-gradient(to bottom, transparent, black) no-repeat bottom;\\n  background-size: 97% 93%;\\n  /* padding-bottom: 30px; */\\n  padding-top: 10px;\\n  padding-bottom: 12px;\\n}\\n.card-text h4 {\\n  color: #fff;\\n  text-align: center;\\n}\\n.popup-holder {\\n  width: 27%;\\n  position: absolute;\\n  background-color: #fff;\\n  left: 0;\\n  right: 0;\\n  top: 50%;\\n  transform: translate(-50%, -50%);\\n  left: 50%;\\n  z-index: 9999;\\n  padding: 61px 31px;\\n  border-radius: 4px;\\n}\\n.popup-holder h4 {\\n  text-align: center;\\n  font-size: 30px;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  font-weight: 400;\\n  margin-bottom: 20px;\\n  margin-top: 0;\\n}\\n.overlay {\\n  position: fixed;\\n  bottom: 0;\\n  right: 0;\\n  left: 0;\\n  background-color: #00000061;\\n  top: 0;\\n  z-index: 1;\\n}\\n.form-group input {\\n  height: 44px;\\n  width: 100%;\\n  outline: none;\\n  padding-left: 10px;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  border-radius: 5px;\\n  box-shadow: none;\\n  border: 1px solid #00000070;\\n  margin-top: 15px;\\n}\\n.form-group {\\n  text-align: center;\\n  margin-bottom: 21px;\\n}\\n.form-group label {\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  font-size: 20px;\\n  font-weight: 400;\\n}\\n.button-primary {\\n  padding: 15px;\\n  background-color: #e83f0b;\\n  color: #fff;\\n  border: none;\\n  font-size: 20px;\\n  border: 1px solid transparent;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n  outline: none;\\n  transition: all 0.3s ease;\\n}\\n.button-primary:hover {\\n  background-color: transparent;\\n  border: 1px solid #e83f0b;\\n  color: #e83f0b;\\n}\\n\\n.popup-holder .button-primary {\\n  width: 100%;\\n  margin-top: 30px;\\n}\\n.google-sign-in {\\n  text-align: center;\\n  padding: 6px;\\n  margin-bottom: 29px;\\n  border: 1px solid #00000040;\\n  border-radius: 5px;\\n  display: block;\\n  width: 100%;\\n  cursor: pointer;\\n  text-decoration: none;\\n}\\n.google-sign-in img {\\n  width: 35px;\\n  vertical-align: sub;\\n}\\n\\n.google-sign-in span {\\n  font-size: 20px;\\n  margin-left: 10px;\\n  vertical-align: super;\\n}\\n\\n.popup-holder p {\\n  text-align: center;\\n  margin-top: 30px;\\n  font-size: 15px;\\n  font-family: \\\"Poppins\\\", sans-serif;\\n}\\n.popup-holder p a {\\n  color: #e83f0b;\\n  font-weight: 700;\\n  cursor: pointer;\\n}\\n.userMenu {\\n  width: 157px;\\n  position: absolute;\\n  top: 51px;\\n  left: -7px;\\n  background-color: #fff;\\n  text-align: left !important;\\n  height: auto !important;\\n  padding-bottom: 6px;\\n  padding-top: 12px;\\n  box-shadow: 0px 6px 14px 1px #00000021;\\n}\\n.userMenu li {\\n  display: block !important;\\n}\\n.userMenu li a {\\n  color: #000 !important;\\n  display: inline-block;\\n  width: 100%;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/App.css?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App.css */ \"./src/App.css\");\n/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _src_actions_signUpActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/actions/signUpActions */ \"./src/actions/signUpActions.js\");\n/* harmony import */ var _logo_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./logo.svg */ \"./src/logo.svg\");\n/* harmony import */ var _logo_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_logo_svg__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _components_Homepage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Homepage */ \"./src/components/Homepage/index.js\");\n/* harmony import */ var _src_components_Profile__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../src/components/Profile */ \"./src/components/Profile/index.js\");\n/* harmony import */ var _src_components_Repairphone__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/components/Repairphone */ \"./src/components/Repairphone.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_13__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/App.js\";\n\n\n\n\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(App, _Component);\n\n  function App() {\n    Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, App);\n\n    return Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(App).apply(this, arguments));\n  }\n\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"App\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 13\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_13__[\"Switch\"], {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 14\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_13__[\"Route\"], {\n        path: \"/\",\n        component: _components_Homepage__WEBPACK_IMPORTED_MODULE_10__[\"default\"],\n        exact: true,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 15\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_13__[\"Route\"], {\n        path: \"/Profile\",\n        component: _src_components_Profile__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 16\n        },\n        __self: this\n      })));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\nfunction mapStateToProps(state) {\n  console.log(\"new state\", state);\n  return {\n    signUpdata: state\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__[\"connect\"])(mapStateToProps, {\n  signUpAction: _src_actions_signUpActions__WEBPACK_IMPORTED_MODULE_7__[\"signUpAction\"]\n})(App));\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/Firebase/firebase.js":
/*!**********************************!*\
  !*** ./src/Firebase/firebase.js ***!
  \**********************************/
/*! exports provided: firebaseRef */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"firebaseRef\", function() { return firebaseRef; });\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase */ \"firebase\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_0__);\n\nvar config = {\n  apiKey: \"AIzaSyDHY1t3LydpDovH5UgGl_RG-lll5wkbtPY\",\n  authDomain: \"tagmetoo-2b903.firebaseapp.com\",\n  databaseURL: \"https://tagmetoo-2b903.firebaseio.com\",\n  projectId: \"tagmetoo-2b903\",\n  storageBucket: \"tagmetoo-2b903.appspot.com\",\n  messagingSenderId: \"950172593241\"\n};\nvar firebaseRef = !firebase__WEBPACK_IMPORTED_MODULE_0__[\"apps\"].length ? firebase__WEBPACK_IMPORTED_MODULE_0__[\"initializeApp\"](config) : firebase__WEBPACK_IMPORTED_MODULE_0__[\"app\"]();\n\n//# sourceURL=webpack:///./src/Firebase/firebase.js?");

/***/ }),

/***/ "./src/actions/constants.js":
/*!**********************************!*\
  !*** ./src/actions/constants.js ***!
  \**********************************/
/*! exports provided: BASEURL, Signup, NEW_POSTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BASEURL\", function() { return BASEURL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Signup\", function() { return Signup; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NEW_POSTS\", function() { return NEW_POSTS; });\nvar BASEURL = \"http://13.59.90.177/tagmetoo\";\nvar Signup = \"Signup\";\nvar NEW_POSTS = \"NEW_POSTS\";\n\n//# sourceURL=webpack:///./src/actions/constants.js?");

/***/ }),

/***/ "./src/actions/signUpActions.js":
/*!**************************************!*\
  !*** ./src/actions/signUpActions.js ***!
  \**************************************/
/*! exports provided: signUpAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"signUpAction\", function() { return signUpAction; });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/actions/constants.js\");\n\nvar signUpAction = function signUpAction(signUpData) {\n  return function (dispatch) {\n    var data = {\n      name: \"paul rudd\",\n      movies: [\"I Love You Man\", \"Role Models\"]\n    };\n    console.log(\"signUpData\", signUpData);\n    fetch(\"https://reqres.in/api/users\", {\n      method: \"POST\",\n      headers: {\n        Accept: \"application/json\" //   \"Content-Type\": \"application/json\"\n\n      },\n      body: data\n    }).then(function (res) {\n      return res.json();\n    }).then(function (data) {\n      console.log(\"data\", data);\n    }).catch(function (error) {\n      console.log(\"error\", error);\n    });\n  };\n}; // export const signUpAction = signUpData => dispatch => {\n//   let data = {\n//     name: \"paul rudd\",\n//     movies: [\"I Love You Man\", \"Role Models\"]\n//   };\n//   console.log(\"signUpData\", signUpData);\n//   fetch(\"http://13.59.90.177/tagmetoo/app/user/signup\", {\n//     method: \"POST\",\n//     headers: {\n//       Accept: \"application/json\"\n//       //   \"Content-Type\": \"application/json\"\n//     },\n//     body: JSON.stringify(signUpData)\n//   })\n//     .then(res => res.json())\n//     .then(data => {\n//       console.log(\"data\", data);\n//     })\n//     .catch(error => {\n//       console.log(\"error\", error);\n//     });\n// };\n\n//# sourceURL=webpack:///./src/actions/signUpActions.js?");

/***/ }),

/***/ "./src/assets/images/banner.jpg":
/*!**************************************!*\
  !*** ./src/assets/images/banner.jpg ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/banner.e41c743d.jpg\";\n\n//# sourceURL=webpack:///./src/assets/images/banner.jpg?");

/***/ }),

/***/ "./src/assets/images/cardimage.jpg":
/*!*****************************************!*\
  !*** ./src/assets/images/cardimage.jpg ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/cardimage.a4959eb3.jpg\";\n\n//# sourceURL=webpack:///./src/assets/images/cardimage.jpg?");

/***/ }),

/***/ "./src/components/Homepage/HomePage.js":
/*!*********************************************!*\
  !*** ./src/components/Homepage/HomePage.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return HomeModule; });\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Shared_Header__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Shared/Header */ \"./src/components/Shared/Header.js\");\n/* harmony import */ var _assets_images_banner_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/images/banner.jpg */ \"./src/assets/images/banner.jpg\");\n/* harmony import */ var _assets_images_banner_jpg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_assets_images_banner_jpg__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/images/cardimage.jpg */ \"./src/assets/images/cardimage.jpg\");\n/* harmony import */ var _assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/components/Homepage/HomePage.js\";\n\n\n\n\n\nvar HomeModule =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(HomeModule, _Component);\n\n  function HomeModule() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, HomeModule);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, (_getPrototypeOf2 = Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(HomeModule)).call.apply(_getPrototypeOf2, [this].concat(args)));\n\n    _this.eventCategoty = function () {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"eventCategoryHolder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 11\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"container pad-0\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 12\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h3\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 13\n        },\n        __self: this\n      }, \"Events Category In Bangalore\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"container\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 15\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"row\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 16\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"col-lg-3 pad-0\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 17\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-holder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 18\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: _assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8___default.a,\n        alt: true,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 19\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-text\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 21\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h4\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 22\n        },\n        __self: this\n      }, \"Night Trek\"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"col-lg-3 pad-0\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 25\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-holder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 26\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: _assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8___default.a,\n        alt: true,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 27\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-text\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 29\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h4\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 30\n        },\n        __self: this\n      }, \"Night Trek\"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"col-lg-3 pad-0\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 33\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-holder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 34\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: _assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8___default.a,\n        alt: true,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 35\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-text\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 37\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h4\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 38\n        },\n        __self: this\n      }, \"Night Trek\"))), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"col-lg-3 pad-0\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 41\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-holder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 42\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: _assets_images_cardimage_jpg__WEBPACK_IMPORTED_MODULE_8___default.a,\n        alt: true,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 43\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"card-text\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 45\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h4\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 46\n        },\n        __self: this\n      }, \"Night Trek\"))))));\n    };\n\n    return _this;\n  }\n\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(HomeModule, [{\n    key: \"changeRoute\",\n    value: function changeRoute(getdata) {\n      this.props.getProps.history.push(getdata);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 56\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Shared_Header__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 57\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"banner\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 58\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: _assets_images_banner_jpg__WEBPACK_IMPORTED_MODULE_7___default.a,\n        alt: \"\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 59\n        },\n        __self: this\n      })), this.eventCategoty(), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        onClick: function onClick() {\n          return _this2.changeRoute(\"/Profile\");\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 62\n        },\n        __self: this\n      }, \"Route\"), \";\");\n    }\n  }]);\n\n  return HomeModule;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/Homepage/HomePage.js?");

/***/ }),

/***/ "./src/components/Homepage/index.js":
/*!******************************************!*\
  !*** ./src/components/Homepage/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Homepage; });\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Homepage_HomePage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Homepage/HomePage */ \"./src/components/Homepage/HomePage.js\");\n\n\n\n\n\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/components/Homepage/index.js\";\n\n\n\nvar Homepage =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Homepage, _Component);\n\n  function Homepage() {\n    Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Homepage);\n\n    return Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Homepage).apply(this, arguments));\n  }\n\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Homepage, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 6\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Homepage_HomePage__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n        getProps: this.props,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 7\n        },\n        __self: this\n      }));\n    }\n  }]);\n\n  return Homepage;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/Homepage/index.js?");

/***/ }),

/***/ "./src/components/Profile/index.js":
/*!*****************************************!*\
  !*** ./src/components/Profile/index.js ***!
  \*****************************************/
/*! exports provided: Profile, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Profile\", function() { return Profile; });\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/components/Profile/index.js\";\n\nvar Profile =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Profile, _Component);\n\n  function Profile() {\n    Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Profile);\n\n    return Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Profile).apply(this, arguments));\n  }\n\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Profile, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 5\n        },\n        __self: this\n      }, \"Profile\");\n    }\n  }]);\n\n  return Profile;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\n//# sourceURL=webpack:///./src/components/Profile/index.js?");

/***/ }),

/***/ "./src/components/Repairphone.js":
/*!***************************************!*\
  !*** ./src/components/Repairphone.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Repairphone; });\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/components/Repairphone.js\";\n\n\nvar Repairphone =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Repairphone, _Component);\n\n  function Repairphone() {\n    Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Repairphone);\n\n    return Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Repairphone).apply(this, arguments));\n  }\n\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Repairphone, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 5\n        },\n        __self: this\n      }, \"repair phone\");\n    }\n  }]);\n\n  return Repairphone;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/Repairphone.js?");

/***/ }),

/***/ "./src/components/Shared/Header.js":
/*!*****************************************!*\
  !*** ./src/components/Shared/Header.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Header; });\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _Firebase_firebase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Firebase/firebase */ \"./src/Firebase/firebase.js\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! firebase */ \"firebase\");\n/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_7__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/components/Shared/Header.js\";\n\n\n\nvar provider = new firebase__WEBPACK_IMPORTED_MODULE_7__[\"auth\"].GoogleAuthProvider();\nprovider.setCustomParameters({\n  prompt: \"select_account\"\n});\n\nvar Header =\n/*#__PURE__*/\nfunction (_Component) {\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Header, _Component);\n\n  function Header() {\n    var _getPrototypeOf2;\n\n    var _this;\n\n    Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Header);\n\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    _this = Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this, (_getPrototypeOf2 = Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(Header)).call.apply(_getPrototypeOf2, [this].concat(args)));\n    _this.state = {\n      popup: false,\n      signInActive: true,\n      overLayActive: false,\n      userDetails: null,\n      rock: \"\",\n      dropdownActive: false\n    };\n    return _this;\n  }\n\n  Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Header, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      console.log(\"das\", this.props.getProps);\n    }\n  }, {\n    key: \"changeRoute\",\n    value: function changeRoute(getdata) {\n      this.props.getProps.history.push(getdata);\n    }\n  }, {\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      // if (typeof Storage !== \"undefined\") {\n      //   // Code for localStorage/sessionStorage.\n      // } else {\n      //   // Sorry! No Web Storage support..\n      // }\n      this.setState({\n        userDetails: JSON.parse(localStorage.getItem(\"userdetails\"))\n      });\n    }\n  }, {\n    key: \"signOut\",\n    value: function signOut() {\n      _Firebase_firebase__WEBPACK_IMPORTED_MODULE_6__[\"firebaseRef\"].auth().signOut().then(function () {\n        // Sign-out successful.\n        console.log(\"successfully signed out\");\n        localStorage.removeItem(\"userdetails\");\n        window.location.reload();\n        this.setState({\n          userDetails: \"\"\n        });\n      }).catch(function (error) {// An error happened.\n      });\n    }\n  }, {\n    key: \"login\",\n    value: function login() {\n      this.setState({\n        popup: true,\n        overLayActive: true\n      });\n    }\n  }, {\n    key: \"activeSignup\",\n    value: function activeSignup() {\n      this.setState({\n        signInActive: false\n      });\n    }\n  }, {\n    key: \"activeSignin\",\n    value: function activeSignin() {\n      this.setState({\n        signInActive: true\n      });\n    }\n  }, {\n    key: \"closePopup\",\n    value: function closePopup() {\n      this.setState({\n        popup: false,\n        overLayActive: false,\n        signInActive: true\n      });\n    }\n  }, {\n    key: \"callAction\",\n    value: function callAction() {\n      alert(\"calld\");\n    }\n  }, {\n    key: \"signInGoogle\",\n    value: function signInGoogle() {\n      _Firebase_firebase__WEBPACK_IMPORTED_MODULE_6__[\"firebaseRef\"].auth().signInWithPopup(provider).then(function (result) {\n        console.log(\"result\", result.additionalUserInfo);\n        localStorage.setItem(\"userdetails\", JSON.stringify(result.additionalUserInfo));\n        window.location.reload(); // this.setState({\n        //   userDetails: result.additionalUserInfo\n        // });\n        // This gives you a Google Access Token. You can use it to access the Google API.\n\n        var token = result.credential.accessToken; // The signed-in user info.\n\n        var user = result.user; // ...\n      }).catch(function (error) {\n        // Handle Errors here.\n        var errorCode = error.code;\n        var errorMessage = error.message; // The email of the user's account used.\n\n        var email = error.email; // The firebase.auth.AuthCredential type that was used.\n\n        var credential = error.credential; // ...\n      }); // Firebase.auth().signInWithRedirect(provider);\n    }\n  }, {\n    key: \"openDropdown\",\n    value: function openDropdown() {\n      this.setState({\n        dropdownActive: !this.state.dropdownActive\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"header\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 113\n        },\n        __self: this\n      }, this.state.overLayActive ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"overlay\",\n        onClick: function onClick() {\n          return _this2.closePopup();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 115\n        },\n        __self: this\n      }) : null, this.state.popup ? this.state.signInActive ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"popup-holder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 119\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h4\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 120\n        },\n        __self: this\n      }, \"Sign in\"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        className: \"google-sign-in\",\n        onClick: function onClick() {\n          return _this2.signInGoogle();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 121\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: \"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZDMTA3OyIgZD0iTSA0My42MDkzNzUgMjAuMDgyMDMxIEwgNDIgMjAuMDgyMDMxIEwgNDIgMjAgTCAyNCAyMCBMIDI0IDI4IEwgMzUuMzA0Njg4IDI4IEMgMzMuNjUyMzQ0IDMyLjY1NjI1IDI5LjIyMjY1NiAzNiAyNCAzNiBDIDE3LjM3MTA5NCAzNiAxMiAzMC42Mjg5MDYgMTIgMjQgQyAxMiAxNy4zNzEwOTQgMTcuMzcxMDk0IDEyIDI0IDEyIEMgMjcuMDU4NTk0IDEyIDI5Ljg0Mzc1IDEzLjE1MjM0NCAzMS45NjA5MzggMTUuMDM5MDYzIEwgMzcuNjE3MTg4IDkuMzgyODEzIEMgMzQuMDQ2ODc1IDYuMDU0Njg4IDI5LjI2OTUzMSA0IDI0IDQgQyAxMi45NTMxMjUgNCA0IDEyLjk1MzEyNSA0IDI0IEMgNCAzNS4wNDY4NzUgMTIuOTUzMTI1IDQ0IDI0IDQ0IEMgMzUuMDQ2ODc1IDQ0IDQ0IDM1LjA0Njg3NSA0NCAyNCBDIDQ0IDIyLjY2MDE1NiA0My44NjMyODEgMjEuMzUxNTYzIDQzLjYwOTM3NSAyMC4wODIwMzEgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGM0QwMDsiIGQ9Ik0gNi4zMDQ2ODggMTQuNjkxNDA2IEwgMTIuODc4OTA2IDE5LjUxMTcxOSBDIDE0LjY1NjI1IDE1LjEwOTM3NSAxOC45NjA5MzggMTIgMjQgMTIgQyAyNy4wNTg1OTQgMTIgMjkuODQzNzUgMTMuMTUyMzQ0IDMxLjk2MDkzOCAxNS4wMzkwNjMgTCAzNy42MTcxODggOS4zODI4MTMgQyAzNC4wNDY4NzUgNi4wNTQ2ODggMjkuMjY5NTMxIDQgMjQgNCBDIDE2LjMxNjQwNiA0IDkuNjU2MjUgOC4zMzU5MzggNi4zMDQ2ODggMTQuNjkxNDA2IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiM0Q0FGNTA7IiBkPSJNIDI0IDQ0IEMgMjkuMTY0MDYzIDQ0IDMzLjg1OTM3NSA0Mi4wMjM0MzggMzcuNDEwMTU2IDM4LjgwODU5NCBMIDMxLjIxODc1IDMzLjU3MDMxMyBDIDI5LjIxMDkzOCAzNS4wODk4NDQgMjYuNzE0ODQ0IDM2IDI0IDM2IEMgMTguNzk2ODc1IDM2IDE0LjM4MjgxMyAzMi42ODM1OTQgMTIuNzE4NzUgMjguMDU0Njg4IEwgNi4xOTUzMTMgMzMuMDc4MTI1IEMgOS41MDM5MDYgMzkuNTU0Njg4IDE2LjIyNjU2MyA0NCAyNCA0NCBaICI+PC9wYXRoPjxwYXRoIHN0eWxlPSIgZmlsbDojMTk3NkQyOyIgZD0iTSA0My42MDkzNzUgMjAuMDgyMDMxIEwgNDIgMjAuMDgyMDMxIEwgNDIgMjAgTCAyNCAyMCBMIDI0IDI4IEwgMzUuMzA0Njg4IDI4IEMgMzQuNTExNzE5IDMwLjIzODI4MSAzMy4wNzAzMTMgMzIuMTY0MDYzIDMxLjIxNDg0NCAzMy41NzAzMTMgQyAzMS4yMTg3NSAzMy41NzAzMTMgMzEuMjE4NzUgMzMuNTcwMzEzIDMxLjIxODc1IDMzLjU3MDMxMyBMIDM3LjQxMDE1NiAzOC44MDg1OTQgQyAzNi45NzI2NTYgMzkuMjAzMTI1IDQ0IDM0IDQ0IDI0IEMgNDQgMjIuNjYwMTU2IDQzLjg2MzI4MSAyMS4zNTE1NjMgNDMuNjA5Mzc1IDIwLjA4MjAzMSBaICI+PC9wYXRoPjwvZz48L3N2Zz4=\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 122\n        },\n        __self: this\n      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"span\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 123\n        },\n        __self: this\n      }, \"Login with Google\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"form-group\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 125\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 126\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"label\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 127\n        },\n        __self: this\n      }, \"Email\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"input\", {\n        type: \"email\",\n        classname: \"form-control\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 129\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"form-group\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 131\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 132\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"label\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 133\n        },\n        __self: this\n      }, \"Password\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"input\", {\n        type: \"password\",\n        classname: \"form-control\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 135\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"button\", {\n        className: \"button-primary\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 137\n        },\n        __self: this\n      }, \"Log in\"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"p\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 138\n        },\n        __self: this\n      }, \"Don\\u2019t have an account?\", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        onClick: function onClick() {\n          return _this2.activeSignup();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 140\n        },\n        __self: this\n      }, \" Sign up\"))) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"popup-holder\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 144\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h4\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 145\n        },\n        __self: this\n      }, \"Sign up\"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"form-group\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 146\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 147\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"label\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 148\n        },\n        __self: this\n      }, \"Name\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"input\", {\n        type: \"text\",\n        classname: \"form-control\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 150\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"form-group\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 152\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 153\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"label\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 154\n        },\n        __self: this\n      }, \"Email\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"input\", {\n        type: \"email\",\n        classname: \"form-control\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 156\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"form-group\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 158\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 159\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"label\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 160\n        },\n        __self: this\n      }, \"Number\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"input\", {\n        type: \"number\",\n        classname: \"form-control\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 162\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"form-group\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 164\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 165\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"label\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 166\n        },\n        __self: this\n      }, \"Password\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"input\", {\n        type: \"password\",\n        classname: \"form-control\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 168\n        },\n        __self: this\n      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"button\", {\n        className: \"button-primary\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 170\n        },\n        __self: this\n      }, \"Sign up\"), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"p\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 171\n        },\n        __self: this\n      }, \"Already have an Tagmetoo account?\", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        onClick: function onClick() {\n          return _this2.activeSignin();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 173\n        },\n        __self: this\n      }, \" Log in\"))) : null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"container\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 178\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"header-inner\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 179\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"logo\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 180\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        href: \"/\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 181\n        },\n        __self: this\n      }, \"# TAG ME TOO\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        className: \"navlinks\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 183\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"ul\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 184\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 190\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 191\n        },\n        __self: this\n      }, \"Explore Events\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 193\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 194\n        },\n        __self: this\n      }, \"Corporate Bookings\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 196\n        },\n        __self: this\n      }, this.state.userDetails !== null ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"div\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 198\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"h3\", {\n        onClick: function onClick() {\n          return _this2.openDropdown();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 199\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"img\", {\n        src: this.state.userDetails.profile.picture,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 200\n        },\n        __self: this\n      })), this.state.dropdownActive ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"ul\", {\n        className: \"userMenu\",\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 203\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 204\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 205\n        },\n        __self: this\n      }, \"Create Page\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 207\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 208\n        },\n        __self: this\n      }, \"Event Pass\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 210\n        },\n        __self: this\n      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 211\n        },\n        __self: this\n      }, \"Profile\")), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"li\", {\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 213\n        },\n        __self: this\n      }, this.state.userDetails != null ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        onClick: function onClick() {\n          return _this2.signOut();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 215\n        },\n        __self: this\n      }, \"SignOut\") : null)) : null) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(\"a\", {\n        onClick: function onClick() {\n          return _this2.login();\n        },\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 222\n        },\n        __self: this\n      }, \"Login\")))))));\n    }\n  }]);\n\n  return Header;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n\n\n\n//# sourceURL=webpack:///./src/components/Shared/Header.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n\nvar server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(app);\nserver.listen(\"8000\", function (error) {\n  if (error) {\n    console.log(error);\n  }\n\n  console.log(\"React SSR App is running: http://localhost:\".concat(\"8000\"));\n});\nvar currentApp = app;\n\nif (true) {\n  module.hot.accept(/*! ./server */ \"./src/server/index.js\", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { (function () {\n    console.log(\"Server reloading...\");\n\n    try {\n      app = __webpack_require__(/*! ./server */ \"./src/server/index.js\").default;\n      server.removeListener(\"request\", currentApp);\n      server.on(\"request\", app);\n      currentApp = app;\n    } catch (error) {// Do nothing\n    }\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/logo.svg":
/*!**********************!*\
  !*** ./src/logo.svg ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"static/media/logo.5d5d9eef.svg\";\n\n//# sourceURL=webpack:///./src/logo.svg?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _signUpReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./signUpReducer */ \"./src/reducers/signUpReducer.js\");\n\n\nvar reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  signUpdata: _signUpReducer__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (reducer);\n\n//# sourceURL=webpack:///./src/reducers/index.js?");

/***/ }),

/***/ "./src/reducers/signUpReducer.js":
/*!***************************************!*\
  !*** ./src/reducers/signUpReducer.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread */ \"./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js\");\n\nvar auth = {\n  signUpData: {}\n};\n\nvar SignUpReducer = function SignUpReducer() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : auth;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n\n  switch (action.type) {\n    case \"Signup\":\n      console.log(\"called the reducer\");\n      state = Object(_Users_mac_Desktop_tagmetoo_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, state, {\n        // accessToken: action.payload.accessToken,\n        // isLogin: true,\n        signUpData: action.payload\n      });\n      break;\n\n    default:\n  }\n\n  return state;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SignUpReducer);\n\n//# sourceURL=webpack:///./src/reducers/signUpReducer.js?");

/***/ }),

/***/ "./src/server/index.js":
/*!*****************************!*\
  !*** ./src/server/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _middleware_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middleware/html */ \"./src/server/middleware/html.js\");\n/* harmony import */ var _middleware_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middleware/store */ \"./src/server/middleware/store.js\");\n/* harmony import */ var _middleware_render__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middleware/render */ \"./src/server/middleware/render.js\");\n\n\n\n\n\nvar publicPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, \"/public\");\nvar app = express__WEBPACK_IMPORTED_MODULE_1___default()();\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(publicPath));\napp.use(Object(_middleware_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"])());\napp.use(Object(_middleware_store__WEBPACK_IMPORTED_MODULE_3__[\"default\"])());\napp.use(Object(_middleware_render__WEBPACK_IMPORTED_MODULE_4__[\"default\"])());\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);\n\n//# sourceURL=webpack:///./src/server/index.js?");

/***/ }),

/***/ "./src/server/middleware/html.js":
/*!***************************************!*\
  !*** ./src/server/middleware/html.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nvar htmlMiddleware = function htmlMiddleware() {\n  return function (req, res, next) {\n    var publicPath = path__WEBPACK_IMPORTED_MODULE_1___default.a.join(__dirname, '/public');\n    fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(\"\".concat(publicPath, \"/app.html\"), 'utf8', function (err, html) {\n      if (!err) {\n        req.html = html;\n        next();\n      } else {\n        res.status(500).send('Error parsing app.html');\n      }\n    });\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (htmlMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/html.js?");

/***/ }),

/***/ "./src/server/middleware/render.js":
/*!*****************************************!*\
  !*** ./src/server/middleware/render.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! escape-string-regexp */ \"escape-string-regexp\");\n/* harmony import */ var escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(escape_string_regexp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../App */ \"./src/App.js\");\nvar _jsxFileName = \"/Users/mac/Desktop/tagmetoo/src/server/middleware/render.js\";\n\n\n\n\n\n\n\n\nvar renderMiddleware = function renderMiddleware() {\n  return function (req, res) {\n    var html = req.html;\n    var store = req.store;\n    var routerContext = {};\n    var htmlContent = react_dom_server__WEBPACK_IMPORTED_MODULE_2___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__[\"Provider\"], {\n      store: store,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 15\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__[\"StaticRouter\"], {\n      location: req.url,\n      context: routerContext,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 16\n      },\n      __self: this\n    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 17\n      },\n      __self: this\n    }))));\n    var htmlReplacements = {\n      HTML_CONTENT: htmlContent,\n      PRELOADED_STATE: serialize_javascript__WEBPACK_IMPORTED_MODULE_4___default()(store.getState(), {\n        isJSON: true\n      })\n    };\n    Object.keys(htmlReplacements).forEach(function (key) {\n      var value = htmlReplacements[key];\n      html = html.replace(new RegExp(\"__\" + escape_string_regexp__WEBPACK_IMPORTED_MODULE_0___default()(key) + \"__\", \"g\"), value);\n    });\n\n    if (routerContext.url) {\n      res.header(\"Cache-Control\", \"no-cache, no-store, must-revalidate\");\n      res.header(\"Pragma\", \"no-cache\");\n      res.header(\"Expires\", 0);\n      res.redirect(302, routerContext.url);\n    } else {\n      res.send(html);\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (renderMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/render.js?");

/***/ }),

/***/ "./src/server/middleware/store.js":
/*!****************************************!*\
  !*** ./src/server/middleware/store.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../reducers */ \"./src/reducers/index.js\");\n\n\n\nvar configureStore = function configureStore() {\n  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(_reducers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n  return store;\n};\n\nvar storeMiddleware = function storeMiddleware() {\n  return function (req, res, next) {\n    var store = configureStore();\n    req.store = store;\n    next();\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (storeMiddleware);\n\n//# sourceURL=webpack:///./src/server/middleware/store.js?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?300 ./src/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?300 */\"./node_modules/webpack/hot/poll.js?300\");\nmodule.exports = __webpack_require__(/*! /Users/mac/Desktop/tagmetoo/src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "escape-string-regexp":
/*!***************************************!*\
  !*** external "escape-string-regexp" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"escape-string-regexp\");\n\n//# sourceURL=webpack:///external_%22escape-string-regexp%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "firebase":
/*!***************************!*\
  !*** external "firebase" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase\");\n\n//# sourceURL=webpack:///external_%22firebase%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-redux\");\n\n//# sourceURL=webpack:///external_%22react-redux%22?");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");\n\n//# sourceURL=webpack:///external_%22react-router-dom%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");\n\n//# sourceURL=webpack:///external_%22redux%22?");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");\n\n//# sourceURL=webpack:///external_%22serialize-javascript%22?");

/***/ })

/******/ });