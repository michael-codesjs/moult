import { Attributes } from "./attributes";
import { CommonAttributes } from "./types";
import { ValueObject } from "./value-object";

/**
 * Base abstract class to be extends by most if not all of our domain entities.
 * It implements common functionality shared by all domain entities and sets rules for them.
 */

export abstract class Entity {

  protected abstract readonly attributes: Attributes<CommonAttributes> | ValueObject<any, boolean>;

  constructor({ }: {} = {}) { } // {}: {} = {} is for constructor signature purposes only
  /*eslint no-empty-pattern: "off"*/

}