const crypto = require('crypto');

class Node {
	constructor(data) {
		this.id = crypto.randomUUID({ disableEntropyCache: true });
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	append(node) {
		node.prev = null;
		node.next = this.head;

		if (this.head) {
			this.head.prev = node;
		}

		this.head = node;

		if (!this.tail) {
			this.tail = this.head;
		}

		return node;
	}

	prepend(node) {
		node.next = null;
		node.prev = this.tail;

		if (this.tail) {
			this.tail.next = node;
		}

		this.tail = node;

		if (!this.head) {
			this.head = this.tail;
		}

		return node;
	}

	insertAfter(target, node) {
		if (!this.head && !this.tail) {
			console.log('Adding to an empty list');
			return this.append(node);
		}

		if (target === this.tail) {
			return this.prepend(node);
		}

		target.next.prev = node;
		node.next = target.next;
		target.next = node;
		node.prev = target;

		return node;
	}

	insertBefore(target, node) {
		if (!this.head && !this.tail) {
			console.log('Adding to an empty list');
			return this.append(node);
		}

		if (target === this.head) {
			return this.append(node);
		}
		target.prev.next = node;
		node.prev = target.prev;
		target.prev = node;
		node.next = target;

		return node;
	}

	behead() {
		if (!this.head) {
			console.log('The list is empty');
			return null;
		}
		if (!this.head.next) {
			const head = this.head;
			this.head = null;
			this.tail = null;
			console.log('BEHEADED: ' + head.data);
			return head;
		}
		const oldHead = this.head;
		const newHead = this.head.next;
		newHead.prev = null;
		this.head.next = null;
		this.head = newHead;
		console.log('BEHEADED: ' + oldHead.data);
		return oldHead;
	}

	curtail() {
		if (!this.tail) {
			console.log('The list is empty');
			return null;
		}
		if (!this.tail.prev) {
			const tail = this.tail;
			this.head = null;
			this.tail = null;
			console.log('CURTAILED: ' + tail.data);
			return tail;
		}
		const oldTail = this.tail;
		const newTail = this.tail.prev;
		newTail.next = null;
		this.tail.prev = null;
		this.tail = newTail;
		console.log('CURTAILED: ' + oldTail.data);
		return oldTail;
	}

	remove(node) {
		if (node === this.head) {
			return this.behead();
		}
		if (node === this.tail) {
			return this.curtail();
		}
		node.prev.next = node.next;
		node.next.prev = node.prev;
		node.next = null;
		node.prev = null;
		console.log(node);
		return node;
	}

	getSize() {
		let cur = this.head;
		let size = 0;
		while (cur) {
			size++;
			cur = cur.next;
		}
		console.log('List size: ' + size);
		return size;
	}

	listNodes() {
		let cur = this.head;
		while (cur) {
			console.log(cur);
			cur = cur.next;
		}
	}
}

const list = new DoublyLinkedList();

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
list.append(node1);
list.append(node2);
list.append(node3);
// list.append(new Node(1));
// list.append(new Node(2));
// list.append(new Node(3));
// list.append(new Node(4));
// list.append(new Node(5));

// list.prepend(new Node(10));
// list.prepend(new Node(20));
// list.prepend(new Node(30));
// list.prepend(new Node(40));
// list.prepend(new Node(50));

// list.listNodes();

// list.curtail();
// list.curtail();

// list.remove(node1);
// list.remove(node2);
// list.remove(node3);

// list.append(new Node(777));

list.insertBefore(node1, new Node(888));

list.listNodes();
list.getSize();

// console.log(list.head);
console.log('HEAD: ' + list.head?.data);
console.log('TAIL: ' + list.tail?.data);
