import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { TokenStorage } from '../util/token.storage';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

/**
 * @author RIAZ JAFFARY
 */

@Injectable()
export class WebSocketConfiguration {
    public stompClient: any = null;
    public endpoint: any = null;
    public topics: any[] = [];
    public callback: any = null;
    
    constructor(public tokenStorage: TokenStorage,
        public toastrService: ToastrService) {
    }

    public createWebSocketConnection(endpoint: string, topics: any[], callback: Function): void {
        let websocketURL = environment.BaseServiceUrl + endpoint;

        this.endpoint = endpoint;
        this.topics = topics;
        this.callback = callback;

        const sockJS = new SockJS(websocketURL);
        this.stompClient = Stomp.over(sockJS);

        this.stompClient.heartbeat.outgoing = 5000; // client will send heartbeats every 20000ms
        this.stompClient.heartbeat.incoming = 0;
        this.stompClient.reconnect_delay = 5000;

        this.stompClient.debug = (frame: any) => {
            //console.log(frame);

            /* if (frame.includes("SUBSCRIBE")) {
                //console.log(frame);
            } else {
                if (frame.includes("DISCONNECT")) {
                    //console.log(frame);
                }
            } */
        };

        const that = this;

        let header = {
            "X-Authorization": "Bearer " + this.tokenStorage.getToken()
        };

        ////console.log("Connecting Socket");

        this.stompClient.connect(header, function (frame: any) {
            that.topics.map(topic => {
                that.stompClient.subscribe(topic, that.callback);
            });
        }, function (e: any) {
            //that.toastrService.error("Server or Network Down Trying to reconnect", "Socket Disconnected");
            //console.log("Socket Disconnected");
            //that.checkWebsocketConnection();
        });
    }

    checkWebsocketConnection(): void {
        setTimeout(() => {
            //console.log("Attempting to connect");
            this.createWebSocketConnection(this.endpoint,this.topics,this.callback);
        }, 10000);
    }

    public disconnectWebSocketConnection() {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.disconnect();
        }
    }
}
