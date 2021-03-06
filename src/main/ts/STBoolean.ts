import { STBlock } from "./STBlock";
import { STMessage } from "./STMessage";
import { STNil } from "./STNil";
import { STObjectBase } from "./STObjectBase";
import { STTypeException } from "./utils/STTypeException";

/**
 * A wrapper-class to represent booleans in Smalltalk
 * code.
 */
export class STBoolean extends STObjectBase {
	public static readonly TRUE = new STBoolean(true);
	public static readonly FALSE = new STBoolean(false);
	public readonly value: boolean;

	public constructor(value: boolean) {
		super();
		this.value = value;

		this.addMethod("ifTrue:", (msg) => {
			if (this.value) { return msg.getValue(0).expect(STBlock).evaluate() }
			return new STNil(this);
		});
		this.addMethod("ifFalse:", (msg) => {
			if (!this.value) { return msg.getValue(0).expect(STBlock).evaluate(); }
			return new STNil(this);
		});
		this.addMethod("ifTrue:ifFalse:", (msg) => {
			if (this.value) {
				return msg.getValue(0).expect(STBlock).evaluate();
			} else {
				return msg.getValue(1).expect(STBlock).evaluate();
			}
		});
		this.addMethod("and:", (msg) => this.combine(this.firstArgAsBool(msg), (a, b) => a && b)); // TODO
		this.addMethod("not", (msg) => STBoolean.from(!value)); // TODO
		this.addMethod("or:", (msg) => this.combine(this.firstArgAsBool(msg), (a, b) => a || b)); // TODO
		this.addMethod("xor:", (msg) => this.combine(this.firstArgAsBool(msg), (a, b) => a != b)); // TODO
		this.addMethod("equals", (msg) => STBoolean.FALSE);
		this.addMethod("equals:", (msg) => {
			let other = msg.getValue(0);
			if (other instanceof STBoolean) {
				return STBoolean.from(this.value === other.value);
			} else {
				return STBoolean.FALSE;
			}
		});
	}

	public static from(value: boolean): STBoolean {
		return value ? STBoolean.TRUE : STBoolean.FALSE;
	}

	private firstArgAsBool(message: STMessage): STBoolean {
		let arg = message.getValue(0);
		if (arg instanceof STBoolean) {
			return arg;
		} else {
			throw new STTypeException("The first argument of " + message.toString() + " has to be a boolean!");
		}
	}

	public combine(other: STBoolean, combiner: (a: boolean, b: boolean) => boolean): STBoolean {
		return STBoolean.from(combiner(this.value, other.value));
	}

	// Override
	public toString(): string {
		return this.value ? "true" : "false";
	}
}