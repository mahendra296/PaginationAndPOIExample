/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
|---------------------------------------------------|
| Copyright (c) 2002-2003 Geir Landr�               |
|                                                   |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/

// Node object
function Node(id, pid, name, url, title, target, icon, iconOpen, open) 
{
	this.id = id;
	this.pid = pid;
	this.name = name;
	this.url = url;
	this.title = title;
	this.target = target;
	this.icon = icon;
	this.iconOpen = iconOpen;
	this._io = open || false;
	this._is = false;
	this._ls = false;
	this._hc = false;
	this._ai = 0;
	this._p;
};

// Tree object
function document_dTree(objName) 
{
	this.config = 
	{
		target				: null,
		folderLinks			: true,
		useSelection		: true,
		useCookies			: true,
		useLines			: true,
		useIcons			: true,
		useStatusText		: false,
		closeSameLevel		: false,
		inOrder				: false
	}
	this.icon = 
	{
		root				: null,
		folder				: null,
		folderOpen			: null,
		node				: null,
		empty				: 'img/empty.gif',
		line				: null,
		join				: null,
		joinBottom			: null,
		plus				: 'img/closeFolderDocBank.png',
		plusBottom			: 'img/closeFolderDocBank.png',
		minus				: 'img/openFolderDocBank.png',
		minusBottom			: 'img/openFolderDocBank.png',
		nlPlus				: 'img/nolines_plus.gif',
		nlMinus				: 'img/nolines_minus.gif'
	};
	this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
};

// Adds a new node to the node array
document_dTree.prototype.add = function(id, pid, name, url, title, target, icon, iconOpen, open) 
{
	this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, title, target, icon, iconOpen, open);
	
};

// Open/close all nodes
document_dTree.prototype.openAll = function() 
{
	this.openAllNode(true);
};
document_dTree.prototype.closeAll = function() 
{
	this.openAllNode(false);
};

// Outputs the tree to the page
document_dTree.prototype.toString = function() 
{
	var str = '<div ="dtree">\n';
	if (document.getElementById) 
	{
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNode(this.root);
	}
	else 
		str += 'Browser not supported.';
	
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};

// Creates the tree structure
document_dTree.prototype.addNode = function(pNode) 
{
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) 
	{
		if (this.aNodes[n].pid == pNode.id) 
		{
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) 
			{
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.node(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};

// Creates the node icon, url and text
document_dTree.prototype.node = function(node, nodeId) 
{
	var str = '<div class="document_dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) 
	{
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) 
		{
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" style="visibility: hidden;position: absolute;"/>';
	}
	if (node.url) 
	{
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
		if (node.title) str += ' title="' + node.title + '"';
		if (node.target) str += ' target="' + node.target + '"';
		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
		str += '>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.openNode(' + nodeId + ');" class="node">';
	//str += node.name;
	str += node.name;
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) 
	{
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNode(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};

// Adds the empty and line icons
document_dTree.prototype.indent = function(node, nodeId) 
{
	var str = '';
	if (this.root.id != node.pid) 
	{
		for (var n=0; n<this.aIndent.length; n++)
			str += '<img src="' + ( (this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty ) + '" alt="" style="visibility: hidden;position: absolute;" />';
		(node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
		if (node._hc) 
		{
			str += '<a href="javascript: ' + this.obj + '.openNode(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
			if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
			else str += ( (node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus ) );
			str += '" alt="" /></a>';
		} else str += '<img src="' + ( (this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join ) : this.icon.empty) + '" alt=""  style="visibility: hidden;"/>';
	}
	return str;
};

// Checks if a node has any children and if it is the last sibling
document_dTree.prototype.setCS = function(node) 
{
	var lastId;
	for (var n=0; n<this.aNodes.length; n++) 
	{
		if (this.aNodes[n].pid == node.id) node._hc = true;
		if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
	}
	if (lastId==node.id) node._ls = true;
};

// Returns the selected node
document_dTree.prototype.getSelected = function() 
{
	var sn = this.getCookie('cs' + this.obj);
	return (sn) ? sn : null;
};

// Highlights the selected node
document_dTree.prototype.s = function(id) 
{
	if (!this.config.useSelection) return;
	var cn = this.aNodes[id];
	if (cn._hc && !this.config.folderLinks) return;
	if (this.selectedNode != id) 
	{
		if (this.selectedNode || this.selectedNode==0) 
		{
			eOld = document.getElementById("s" + this.obj + this.selectedNode);
			if(eOld)
			eOld.className = "node";
		}
		eNew = document.getElementById("s" + this.obj + id);
		eNew.className = "nodeSel";
		this.selectedNode = id;
		if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
	}
};

// Toggle Open or close
document_dTree.prototype.openNode = function(id) 
{
	var cn = this.aNodes[id];
	this.nodeStatus(!cn._io, id, cn._ls);
	cn._io = !cn._io;
	if (this.config.closeSameLevel) this.closeLevel(cn);
	if (this.config.useCookies) this.updateCookie();
};

// Open or close all nodes
document_dTree.prototype.openAllNode = function(status) 
{
	for (var n=0; n<this.aNodes.length; n++) 
	{
		if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) 
		{
			this.nodeStatus(status, n, this.aNodes[n]._ls)
			this.aNodes[n]._io = status;
		}
	}
	if (this.config.useCookies) this.updateCookie();
};

// Opens the tree to a specific node
document_dTree.prototype.openTo = function(nId, bSelect, bFirst) 
{
	if (!bFirst) 
	{
		for (var n=0; n<this.aNodes.length; n++) 
		{
			if (this.aNodes[n].id == nId) 
			{
				nId=n;
				break;
			}
		}
	}
	var cn=this.aNodes[nId];
	if (cn.pid==this.root.id || !cn._p) return;
	cn._io = true;
	cn._is = bSelect;
	if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
	if (this.completed && bSelect) this.s(cn._ai);
	else if (bSelect) this._sn=cn._ai;
	this.openTo(cn._p._ai, false, true);
};

// Closes all nodes on the same level as certain node
document_dTree.prototype.closeLevel = function(node) 
{
	for (var n=0; n<this.aNodes.length; n++) 
	{
		if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) 
		{
			this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);
		}
	}
}

// Closes all children of a node
document_dTree.prototype.closeAllChildren = function(node) 
{
	for (var n=0; n<this.aNodes.length; n++) 
	{
		if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) 
		{
			if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
			this.aNodes[n]._io = false;
			this.closeAllChildren(this.aNodes[n]);		
		}
	}
}

// Change the status of a node(open or closed)
document_dTree.prototype.nodeStatus = function(status, id, bottom) 
{
	eDiv	= document.getElementById('d' + this.obj + id);
	eJoin	= document.getElementById('j' + this.obj + id);
	if (this.config.useIcons) 
	{
		eIcon	= document.getElementById('i' + this.obj + id);
		eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
	}
	eJoin.src = (this.config.useLines)?
	((status)?((bottom)?this.icon.minusBottom:this.icon.minus):((bottom)?this.icon.plusBottom:this.icon.plus)):
	((status)?this.icon.nlMinus:this.icon.nlPlus);
	eDiv.style.display = (status) ? 'block': 'none';
};


// [Cookie] Clears a cookie
document_dTree.prototype.clearCookie = function() 
{
	var now = new Date();
	var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
	this.setCookie('co'+this.obj, 'cookieValue', yesterday);
	this.setCookie('cs'+this.obj, 'cookieValue', yesterday);
};

// [Cookie] Sets value in a cookie
document_dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) 
{
	document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};

// [Cookie] Gets a value from a cookie
document_dTree.prototype.getCookie = function(cookieName) 
{
	var cookieValue = '';
	var posName = document.cookie.indexOf(escape(cookieName) + '=');
	if (posName != -1) 
	{
		var posValue = posName + (escape(cookieName) + '=').length;
		var endPos = document.cookie.indexOf(';', posValue);
		if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
		else cookieValue = unescape(document.cookie.substring(posValue));
	}
	return (cookieValue);
};

// [Cookie] Returns ids of open nodes as a string
document_dTree.prototype.updateCookie = function() 
{
	var str = '';
	for (var n=0; n<this.aNodes.length; n++) 
	{
		if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) 
		{
			if (str) str += '.';
			str += this.aNodes[n].id;
		}
	}
	this.setCookie('co' + this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
document_dTree.prototype.isOpen = function(id) 
{
	var aOpen = this.getCookie('co' + this.obj).split('.');
	for (var n=0; n<aOpen.length; n++)
		if (aOpen[n] == id) return true;
	return false;
};

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) 
{
	Array.prototype.push = function array_push() 
	{
		for(var i=0;i<arguments.length;i++)
			this[this.length]=arguments[i];
		return this.length;
	}
};
if (!Array.prototype.pop) 
{
	Array.prototype.pop = function array_pop() 
	{
		lastElement = this[this.length-1];
		this.length = Math.max(this.length-1,0);
		return lastElement;
	}
};

/*---------------------------------------------For DocumentBank----------------------------------------------*/

// Outputs the tree to the page
document_dTree.prototype.toStringForDocumentBank = function() 
{
	var str = '<div class="dtree">\n';
	if (document.getElementById) 
	{
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNodeForDocumentBank(this.root);
	} else str += 'Browser not supported.';
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};
document_dTree.prototype.toStringForViewDocumentBank = function() {
	var str = '<div class="dtree">\n';
	if (document.getElementById) {
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNodeForViewDocumentBank(this.root);
	} else str += 'Browser not supported.';
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};
// Creates the tree structure
document_dTree.prototype.addNodeForDocumentBank = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.nodeForDocumentBank(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};
document_dTree.prototype.addNodeForViewDocumentBank = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.nodeForViewDocumentBank(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};

// Creates the node icon, url and text
document_dTree.prototype.nodeForDocumentBank = function(node, nodeId) 
{
	var str = '<div class="document_dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) 
	{
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) 
		{
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		//if (node.url=="#1") {node.icon =null;node.iconOpen=null;}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt=""  style="visibility: hidden;position: absolute;"/>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.openNode(' + nodeId + ');" class="node">';
	//str += node.name;
	if(node.name=='<b style="font-size: 14px;">Document Bank</b>')
	{
		
		/*str += node.name;*/
	}
	else
	{
		var flag=1;
		var flag1=0;
		var string1=node.name;
		var string = string1.replace("'","\\'");
		
		if (node.url=="#1")
			
			str += "  <a href=\"javascript:fileDownload('"+node.id+"','"+string+"')\">"+node.title+"</a> "+" "+" <a href=\"javascript:deleteCategory('"+node.id+"','"+string+"','"+flag+"')\"><img src=\""+imgPathWithTheme+"deleteDocBank.png\" alt=\"Delete\" title=\"Delete\"></a> ";
			else
			str += "<b>"+node.name+"</b>"+" "+"<a href=\"#\"  onclick=\"openWindow('/esourcingWeb/manageDocumentBankFileUpload.do?action=fileUpload&flag=1&&documentBankID='+"+node.id+",'50','width=900,height=450')\"><img src=\""+imgPathWithTheme+"uploadDocBank.png\" alt=\"Upload File\" title=\"Upload File\"></a>  <a href=\"javascript:modifyCategory('"+node.id+"','"+string+"')\"><img src=\""+imgPathWithTheme+"editDocBank.png\" alt=\"Edit\" title=\"Edit\"></a> <a href=\"javascript:deleteCategory('"+node.id+"','"+string+"','"+flag1+"')\"><img src=\""+imgPathWithTheme+"deleteDocBank.png\" alt=\"Delete\" title=\"Delete\"></a> <a href=\"javascript:addSubCategory('"+node.id+"','"+string+"')\"><img src=\""+imgPathWithTheme+"addDocBank.png\" alt=\"New Sub-Folder\" title=\"New Sub-Folder\"></a>";
	}
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNodeForDocumentBank(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};
document_dTree.prototype.nodeForViewDocumentBank = function(node, nodeId) {
	var str = '<div class="document_dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt=""  style="visibility: hidden;position: absolute;"/>';
	}
	if (node.url) {
		str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
		if (node.title) str += ' title="' + node.title + '"';
		if (node.target) str += ' target="' + node.target + '"';
		if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';
		if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc))
			str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
		str += '>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.openNode(' + nodeId + ');" class="node">';
	//str += node.name;
	//if(node.name=="<b>Category</b>")
	//{
		str += node.name;
	//}
	//else
	//{
	//	str += node.name+" <a href=\"javascript:modifyCategory('"+node.id+"','"+node.name+"')\"><img src=\""+imgPathWithTheme+"modify.gif\" alt=\"edit\"></a> <a href=\"javascript:deleteCategory('"+node.id+"')\"><img src=\""+imgPathWithTheme+"delete.gif\" alt=\"delete\"></a> <a href=\"javascript:addSubCategory('"+node.id+"','"+node.name+"')\"><img src=\""+imgPathWithTheme+"addCatregory.gif\" alt=\"add subcategory\"></a>";
	//}
	if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
	str += '</div>';
	if (node._hc) {
		str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
		str += this.addNodeForViewDocumentBank(node);
		str += '</div>';
	}
	this.aIndent.pop();
	return str;
};
/*---------------------------------------------To save DocumentBank----------------------------------------------*/

// Outputs the tree to the page
document_dTree.prototype.toStringDocumentBank = function() {
	var str = '<div class="dtree">\n';
	if (document.getElementById) {
		if (this.config.useCookies) this.selectedNode = this.getSelected();
		str += this.addNodeDocumentBank(this.root);
	} else str += 'Browser not supported.';
	str += '</div>';
	if (!this.selectedFound) this.selectedNode = null;
	this.completed = true;
	return str;
};
// Creates the tree structure
document_dTree.prototype.addNodeDocumentBank = function(pNode) {
	var str = '';
	var n=0;
	if (this.config.inOrder) n = pNode._ai;
	for (n; n<this.aNodes.length; n++) {
		if (this.aNodes[n].pid == pNode.id) {
			var cn = this.aNodes[n];
			cn._p = pNode;
			cn._ai = n;
			this.setCS(cn);
			if (!cn.target && this.config.target) cn.target = this.config.target;
			if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
			if (!this.config.folderLinks && cn._hc) cn.url = null;
			if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
					cn._is = true;
					this.selectedNode = n;
					this.selectedFound = true;
			}
			str += this.nodeDocumentBank(cn, n);
			if (cn._ls) break;
		}
	}
	return str;
};
var tempArr=[];
//Creates the node icon, url and text
document_dTree.prototype.nodeDocumentBank = function(node, nodeId) {
var traversalNode=node;
	var str = '<div class="document_dTreeNode">' + this.indent(node, nodeId);
	if (this.config.useIcons) {
		if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
		if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
		if (this.root.id == node.pid) {
			node.icon = this.icon.root;
			node.iconOpen = this.icon.root;
		}
		str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt=""  style="visibility: hidden;position: absolute;"/>';
	}
	else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id)
		str += '<a href="javascript: ' + this.obj + '.openNode(' + nodeId + ');" class="node">';
	//str += node.name;
	if(node.name=='<b style="font-size: 14px;">Document Bank</b>')
	{
		str += node.name;
	}
	else
	{
	//if(document.getElementById("categoryMasterID_hidden")!='undefined' && document.getElementById("categoryMasterID_hidden")!=null)
	{
		
		var documentBankIDStr=document.forms[0].documentBankMasterID_hidden.value;
		var documentBankNameStr=document.forms[0].documentBankfolderOrDocName_hidden.value;
		var documentBankIDTermsCoditionStr=document.forms[0].documentBankMasterIDTermsCodition_hidden.value;
		var documentBankNameTermsCoditionStr=document.forms[0].documentBankfolderOrDocNameTermsCodition_hidden.value;
		
	}
	//else
	{
		//var categoryIDStr='';
	}
	
	
	var documentBankIDStr=[];
	var counter=0;
	
			if(documentBankIDStr=="" || documentBankIDStr==null)
			{
				if (node.url=="#1")	
				{
					str +="<input type=\"checkbox\" name=\"chk_"+node.id+"\" id=\"chk_"+node.id+"\" onclick=\"document_Tree.treeTraverse('"+node.id+"','"+node.pid+"')\" >";
					str+=node.title;
				}
				else
				{
					str+=node.name;
				}
				
				
				
				
			}else{
				documentBankIDArr=documentBankIDStr.split(",");
				for(var i=0;i<documentBankIDArr.length;i++)
				{
					if(parseInt(documentBankIDArr[i])==node.id || documentBankIDArr[i]==node.id)
					{	
						counter++;
						
					}
				}

				if(counter>0)
				{
					this.childNodes(node.id);
					if (node.url=="#1")	
						{
						str +="<input type=\"checkbox\" name=\"chk_"+node.id+"\" id=\"chk_"+node.id+"\" onclick=\"document_Tree.treeTraverse('"+node.id+"','"+node.pid+"')\" checked >";
						str+=node.title;
						}
					else
					{
						str+=node.name;
					}
					
				}else{
					for(var i=0;i<tempArr.length;i++)
					{
						
						if(tempArr[i]==node.id)
						{
							counter++;
						}
						
					}
					if (node.url=="#1")
					{
						if(counter>0)
						{	
							str +="<input type=\"checkbox\" name=\"chk_"+node.id+"\" id=\"chk_"+node.id+"\" onclick=\"document_Tree.treeTraverse('"+node.id+"','"+node.pid+"')\" checked disabled >";					
						}else{
							str +="<input type=\"checkbox\" name=\"chk_"+node.id+"\" id=\"chk_"+node.id+"\" onclick=\"document_Tree.treeTraverse('"+node.id+"','"+node.pid+"')\" >";
						}
					}
					if (node.url=="#1")
					{
						str+=node.title;
					}
					else
					{
						str+=node.name;
					}	
				}
			}
		}
		if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
		str += '</div>';
		if (node._hc) {
			str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
			str += this.addNodeDocumentBank(node);
			str += '</div>';
		}
		this.aIndent.pop();
		return str;
	};

/////////////////////////////////////check for hdg////////////////
document_dTree.prototype.clearNodesForReferesh = function() {
	
	var node_len=this.aNodes.length;
	for(var ind=0;ind<node_len;ind++)
	{
			//this.aNodes[ind].id = id;
			//this.aNodes[ind].pid = pid;
			//this.aNodes[ind].name = name;
			//this.aNodes[ind].url = url;
			//this.aNodes[ind].title = title;
			//this.aNodes[ind].target = target;
//			this.aNodes[ind].icon = icon;
	//		this.aNodes[ind].iconOpen = iconOpen;
			this.aNodes[ind]._io = open || false;
			this.aNodes[ind]._is = false;
			this.aNodes[ind]._ls = false;
			this.aNodes[ind]._hc = false;
			this.aNodes[ind]._ai = 0;
			this.aNodes[ind]._p=null;
	}
};
document_dTree.prototype.removeAllNodesAndMakeFirstNode= function(firstNodeCaption) {
	//this.obj = objName;
	this.aNodes = [];
	this.aIndent = [];
	this.root = new Node(-1);
	this.selectedNode = null;
	this.selectedFound = false;
	this.completed = false;
	
	this.add(0,-1,firstNodeCaption);
};

document_dTree.prototype.treeTraverse=function(id,pid)
{
	for(var n=0;n<this.aNodes.length; n++)
	{
		if(document.getElementById("chk_"+id).checked)
		{
			
			if(this.aNodes[n].pid==id)
			{
			
				document.getElementById("chk_"+this.aNodes[n].id).disabled=true;
				document.getElementById("chk_"+this.aNodes[n].id).checked=true;
				this.treeTraverse(this.aNodes[n].id,this.aNodes[n].pid)
			}	
		}else
		{
			
			if(this.aNodes[n].pid==id)
			{
			
				document.getElementById("chk_"+this.aNodes[n].id).disabled=false;
				document.getElementById("chk_"+this.aNodes[n].id).checked=false;
				this.treeTraverse(this.aNodes[n].id,this.aNodes[n].pid)
			}	
		}
		
		
	}
}
document_dTree.prototype.saveDocumentBank=function()
{
var documentBankArr="";
var folderorDocNameArr="";
var documentBankTermsCoditionArr="";
var folderorDocNameTermsCoditionArr="";
var i=0;
	for(var n=0;n<this.aNodes.length; n++)
	{

		if(((this.aNodes[n].id>0) || (this.aNodes[n].id!="0")))
		{						
			if(document.getElementById("chk_"+this.aNodes[n].id)!=null && this.aNodes[n].url=="#1" && document.getElementById("chk_"+this.aNodes[n].id).checked)
			{
				//arr[i]	=this.aNodes[n].id;
				documentBankArr +=this.aNodes[n].id+",";		
				folderorDocNameArr +=this.aNodes[n].name+",";
			}
			
		}
	}
	
	documentBankArr=removeLastComma(documentBankArr);
	folderorDocNameArr=removeLastComma(folderorDocNameArr);
	
	document.forms[0].documentBankMasterID_hidden.value=documentBankArr;
	document.forms[0].documentBankfolderOrDocName_hidden.value=folderorDocNameArr;
	if(document.getElementById("documentBankMasterID_hidden")!=null){

		document.getElementById("documentBankMasterID_hidden").value=documentBankArr;
	}
	if(document.getElementById("documentBankfolderOrDocName_hidden")!=null){

		document.getElementById("documentBankfolderOrDocName_hidden").value=folderorDocNameArr;
	}
	
	documentBankTermsCoditionArr=removeLastComma(documentBankTermsCoditionArr);
	
//	window.close();
}

document_dTree.prototype.saveTermsCoditionDocumentBank=function()
{
var documentBankTermsCoditionArr="";
var folderorDocNameTermsCoditionArr="";
var i=0;
	
	for(var n=0;n<this.aNodes.length; n++)
	{

		if(((this.aNodes[n].id>0) || (this.aNodes[n].id!="0")))
		{						
			if(this.aNodes[n].url=="#1" && document.getElementById("chk_"+this.aNodes[n].id)!=null && document.getElementById("chk_"+this.aNodes[n].id).checked)
			{
				//arr[i]	=this.aNodes[n].id;
				documentBankTermsCoditionArr +=this.aNodes[n].id+",";		
				folderorDocNameTermsCoditionArr +=this.aNodes[n].name+",";
			}
		}
	}
	
	documentBankTermsCoditionArr=removeLastComma(documentBankTermsCoditionArr);
	folderorDocNameTermsCoditionArr=removeLastComma(folderorDocNameTermsCoditionArr);
	
	document.forms[0].documentBankMasterIDTermsCodition_hidden.value=documentBankTermsCoditionArr;
	document.forms[0].documentBankfolderOrDocNameTermsCodition_hidden.value=documentBankTermsCoditionArr;
	
	
	if(document.getElementById("documentBankMasterIDTermsCodition_hidden")!=null){

		document.getElementById("documentBankMasterIDTermsCodition_hidden").value=documentBankTermsCoditionArr;
	}
	if(document.getElementById("documentBankfolderOrDocNameTermsCodition_hidden")!=null){

		document.getElementById("documentBankfolderOrDocNameTermsCodition_hidden").value=folderorDocNameTermsCoditionArr;
	}
	
//	window.close();
}
var x=0
document_dTree.prototype.childNodes=function(id)
{

	for(var i=0;i<this.aNodes.length;i++)
	{
		if(this.aNodes[i].pid==id)
		{
	
			this.childNodes(this.aNodes[i].id);
			tempArr[x]=this.aNodes[i].id
			x++;
		}
	}	
}
function removeLastComma(strng){        
    var n=strng.lastIndexOf(",");
    var a=strng.substring(0,n) 
    return a;
}