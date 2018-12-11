// const Building = require('../../models/building');
// const userIds = [
//   '5be9860fcb16d525543ceda2',
//   '5be9860fcb16d525543ceda3'
// ];
// const eventData = [
//   {
//     title: 'test1',
//     artist: 'test1',
//     venue: 'test1',
//     date: 20471,
//     description: 'test1',
//     image: 'test1',
//     usersAttending: [],
//     comments: [],
//     createdBy: userIds[0]
//   },
//   {
//     title: 'test2',
//     artist: 'test2',
//     venue: 'test2',
//     date: 20472,
//     description: 'test2',
//     image: 'test2',
//     usersAttending: [],
//     comments: [],
//     createdBy: userIds[0]
//   },
//   {
//     title: 'test3',
//     artist: 'test3',
//     venue: 'test3',
//     date: 20473,
//     description: 'test3',
//     image: 'test3',
//     usersAttending: [],
//     comments: [],
//     createdBy: userIds[0]
//   }
// ];
//
// describe('Events INDEX', () => {
//
//   beforeEach(done => {
//     Event.remove({})
//       .then(() => Event.create(eventData))
//       .then(() => done());
//   });
//
//   it('should return a 200 response', done => {
//     api.get('/api/events')
//       .end((err, res) => {
//         expect(res.status).to.eq(200);
//         done();
//       });
//   });
//
//   it('should return an array', done => {
//     api.get('/api/events')
//       .end((err, res) => {
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });
//
//   it('should return an array of objects', done => {
//     api.get('/api/events')
//       .end((err, res) => {
//         res.body.forEach(item => expect(item).to.be.an('object'));
//         done();
//       });
//   });
//
//   it('should return the correct data', done => {
//     api.get('/api/events')
//       .end((err, res) => {
//         res.body.forEach(event => {
//           const dataItem = eventData.find(item => item.title === event.title);
//           expect(event.title).to.eq(dataItem.title);
//           expect(event.artist).to.eq(dataItem.artist);
//           expect(event.venue).to.eq(dataItem.venue);
//         });
//         done();
//       });
//   });
//
// });
