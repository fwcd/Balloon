import { STMessage } from "./STMessage";
import { STObject } from "./STObject";
import { STNil } from "./STNil";

export type MessageHandler = (message: STMessage) => STObject;

/**
 * A convenience class to simplify message
 * handling.
 */
export class STMethodHolder extends STObject {
	private methods: { [selector: string] : MessageHandler; } = {};
	private postMethodHandler: (msg: STMessage) => STObject = (msg: STMessage) => new STNil(this);
	private delegate: STObject = new STNil(this);

	// Override
	protected handleMessage(message: STMessage): STObject {
		let selector: string = message.getSelector().value;

		for (let methodSelector in this.methods) {
			if (selector === methodSelector) {
				return this.methods[methodSelector](message);
			}
		}

		let postMethodHandlerResult = this.postMethodHandler(message);
		if (!postMethodHandlerResult.isNil()) {
			return postMethodHandlerResult;
		}
		if (!this.delegate.isNil()) {
			return this.delegate.receiveMessage(message);
		}
		return new STNil(this);
	}

	protected setPostMethodHandler(handler: (msg: STMessage) => STObject) {
		this.postMethodHandler = handler;
	}

	protected setDelegate(delegate: STObject): void {
		this.delegate = delegate;
	}

	protected addMethod(selector: string, handler: MessageHandler): void {
		this.methods[selector] = handler;
	}
}