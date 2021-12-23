import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'ByocUnPlugin';

export default class ByocUnPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.Actions.addListener("beforeStartOutboundCall", (payload, abortFunction) => {
      // check if calling Queue is SIP
      if (payload.queueSid === "WQ9f0b9440750dbb413dcff53df5e76018"){
       console.log("number to call:", "sip:"+payload.destination+"@customer_IP_SBC")
       payload.destination = "sip:"+payload.destination+"@2customer_IP_SBC"
       payload.callerId = "+54xxxxx"
     } else{
       console.log("Non SIP Call, only changing CLI")
       payload.callerId = "+548xxxxx"
     }
      console.log("updated outbound call to:", payload)
      
   })
   
  }

  //before payload.callerId = "+541150771270" 
  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
