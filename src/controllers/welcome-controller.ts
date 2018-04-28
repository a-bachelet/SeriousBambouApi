/**
 * Dependencies Imports
 */
import { Request, Response } from 'express';
import * as request from 'request';

/**
 * Interfaces Imports
 */
import { ICallable } from '../interfaces/i-callable';
import { IRoute } from '../interfaces/i-route';

/**
 * Abstract Classes Imports
 */
import { AbstractController } from '../abstract/abstract-controller';

/**
 * WelcomeController Class Definition
 */
export class WelcomeController extends AbstractController {

    protected routes: IRoute[] = [
        { method: 'GET', path: '/', callable: this.getWelcomingMessage, middlewares: [] },
        { method: 'GET', path: '/test', callable: this.test, middlewares: [] }
    ]; // Controller routes

    /**
     * Returns a welcoming message
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private getWelcomingMessage(req: Request, res: Response): void {
        res.status(200).send({ message: 'Welcome on Node Server Monitor Rest API !' });
    }

    /**
     * Tests something
     * @param req (Request) Incoming express request
     * @param res (Response) Outgoing express response
     */
    private test(req: Request, res: Response): void {
        const faceIds: any = [];

        request.post({
            url:
            'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true',
            headers: {
                'Ocp-Apim-Subscription-Key': '06d4e307942e4c0eaca3c365a9881205'
            },
            body: JSON.stringify({url:
'https://gal.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.'
+ '2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F80fa3a34-4868-4f22'
+ '-9312-97bfc8d7367c.2Ejpeg/2216x1536/quality/80/francois-hollande.jpg'})
        },
        (err, httpResponse, body) => {
            faceIds.push(JSON.parse(body)[0].faceId);
            request.post({
                url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true',
                headers: {
                    'Ocp-Apim-Subscription-Key': '06d4e307942e4c0eaca3c365a9881205'
                },
                body: JSON.stringify({url:
                    'https://gal.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image'
+ '.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2F80fa3a34-'
+ '4868-4f22-9312-97bfc8d7367c.2Ejpeg/2216x1536/quality/80/francois-hollande.jpg'})
            },
            (err2, httpResponse2, body2) => {
                faceIds.push(JSON.parse(body)[0].faceId);

                request.post({
                    url: 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify',
                    headers: {
                        'Ocp-Apim-Subscription-Key': '06d4e307942e4c0eaca3c365a9881205'
                    },
                    body: JSON.stringify({
                        faceId1: faceIds[0],
                        faceId2: faceIds[1]
                    })
                },
                (err3, httpResponse3, body3) => {
                    faceIds.push(JSON.parse(body));
                    res.send(body);
                });

            });
        });
    }

}
