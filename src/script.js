console.log('Hello from content script!');
import { sendMessage } from "webext-bridge/content-script";

const sendToBackground = async () => {
    const response = await sendMessage('RECORD_NAME', {
        first_name: 'John',
        last_name: 'Doe'
    }, 'background');

    // Handle response
}

sendToBackground();