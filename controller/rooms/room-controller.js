const router = require('express').Router();
const httpResponse = require('../../http-handler');
const upload = require('../../hepler/multer-file-upload');
const roomService = require('../../services/room-services');

router.post('/addroom', upload.array('files', 5), async (req, res) => {
  try {
    const parse = JSON.parse(req.body.body);
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push('/images/' + req.files[i].filename);
    }
    parse['images'] = reqFiles;
    const data = await roomService.add(parse);
    httpResponse.successHandler(res, 200, null, null, data);
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await roomService.get();
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.post('/booking', async (req, res) => {
  try {
    const data = await roomService.book(req.body);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.get('/getbooking/:id', async (req, res) => {
  try {
    const data = await roomService.getBooking(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

router.delete('/deletebooking/:id', async (req, res) => {
  try {
    const data = await roomService.deleteBooking(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});
router.delete('/deleteroom/:id', async (req, res) => {
  try {
    const data = await roomService.deleteRoom(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

router.post('/findrooms', async (req, res) => {
  try {
    const data = await roomService.getFindRooms(req.body);

    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

router.get('/available', async (req, res) => {
  try {
    const data = await roomService.available(req.body);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

router.patch('/:id', upload.array('files', 5), async (req, res) => {
  try {
    const parse = JSON.parse(req.body.body);
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push('/images/' + req.files[i].filename);
    }
    parse['images'] = reqFiles;
    const data = await roomService.update(req.params.id, parse);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

module.exports = router;
