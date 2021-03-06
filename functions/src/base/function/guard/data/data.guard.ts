import { Guard } from "../guard.interface";
import { reduce as __reduce } from "lodash";

/**
 * Guard that checks if T contains all required parameters before executing the function.
 * 
 * @usage - e.g. 
 */
export class DataGuard<T> implements Guard<T>
{
  constructor(private _needed: string[]) { }

  check(data)
  {
    return __reduce(this._needed,
                    // Test if the string need is a param of data.
                    (prev, need) => prev && data[need], 
                    true);
  }

}