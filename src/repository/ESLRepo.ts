export class ESLRepo {
  constructor() {}

  async save(email: string): Promise<void> {
    const response = await fetch('https://skrybeapi.site/esl/subscription', {
      body: email,
      headers: {
        'Content-Type': 'text/plain'
      },
      method: 'POST'
    });

    const responseBody = await response.json();

    response.status;
    responseBody.type;
  }
}
