const NotFoundError = require('../errors/notFoundError');
const MatchingRequest = require('../models/matchingPost/matchingPost');
const UserDog = require('../models/user/userDog');

class MatchingRequestService {
  // 강아지 정보 불러오기
  async getUserDogInfo(_id) {
    const findUserDog = await UserDog.find({ user: _id });
    // .map((userDog) => userDog._id,);
    // console.log(findUserDog);
    if (!findUserDog) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return findUserDog;
  }
  // 매칭글 작성하기
  async postMatchingRequest(
    _id,
    userDog,
    price,
    location,
    locationDetail,
    walkingDate,
    walkingDuration,
    requestText,
  ) {
    const newMatchingPost = await MatchingRequest.create({
      user: _id,
      userDog,
      price,
      location,
      locationDetail,
      walkingDate,
      walkingDuration,
      requestText,
    });

    // 매칭글 작성하기
    // async postMatchingRequest(
    //   userId,
    //   price,
    //   location,
    //   locationDetail,
    //   walkingDate,
    //   walkingDuration,
    //   requestText,
    //   // dto 사용하기.
    // ) {
    //   const findUserDog = await UserDog.find({ user: userId });
    //   // console.log(findUserDog);
    //   // console.log(findUserDog[0]._id);
    //   const newMatchingPost = await MatchingRequest.create({
    //     user: userId,
    //     userDog: findUserDog.map((userDog) => userDog._id),
    //     price,
    //     location,
    //     locationDetail,
    //     walkingDate,
    //     walkingDuration,
    //     requestText,
    //   });

    if (!newMatchingPost) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return newMatchingPost;
  }
  // 매칭글 수정하기
  async putMatchingRequest(
    _id,
    matchingPostId,
    price,
    location,
    locationDetail,
    walkingDate,
    walkingDuration,
    requestText,
  ) {
    const updateMatchingRequest = await MatchingRequest.findOneAndUpdate(
      {
        _id: matchingPostId,
        user: _id,
      },
      {
        price,
        location,
        locationDetail,
        walkingDate,
        walkingDuration,
        requestText,
      },
      { new: true },
    );

    if (!updateMatchingRequest) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return updateMatchingRequest;
  }

  async removeMatchingRequest(_id, matchingPostId) {
    const removeMatchingRequest = await MatchingRequest.updateOne(
      {
        _id: matchingPostId,
        user: _id,
      },
      {
        deletedAt: Date.now(),
      },
    );

    if (!removeMatchingRequest) {
      throw new NotFoundError(`요청받은 리소스를 찾을 수 없습니다`);
    }

    return removeMatchingRequest;
  }
}

module.exports = new MatchingRequestService();
