import { FunctionRegistrar } from "../function-registrar.interface";
import { CloudFunction, https } from 'firebase-functions';

import { Context } from '../../../context/context.interface';

/**
 * Firestore registrar. 
 * 
 * REST Service Registration
 */
export class RestRegistrar<T, R> extends FunctionRegistrar<T, R>
{
  constructor() { super(); }

  register(func: (dataSnap: any, context: any) => Promise<R>): CloudFunction<any>
  {
    return https.onCall(func);
  }

  before(dataSnap: any, context: any): { data: T; context: Context; } {
    return { data: dataSnap, context };
  }

  after(result: R, _): any {
    return result;
  }

  onError(e: Error) {
    return new Promise((_) => { throw e; });
  }

}