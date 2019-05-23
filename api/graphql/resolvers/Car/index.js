import Car from '../../../server/models/Car';

export default {
  Query: {
    car: async (parent, { _id }, context, info) => {
      // eslint-disable-next-line
      return await Car.findOne({ _id }).exec();
    },
    cars: async (parent, args, context, info) => {
      const cars = await Car.find({})
        .populate()
        .exec();

      return cars.map((c) => ({
        _id: c._id.toString(),
        model: c.model,
        manufacturer: c.manufacturer,
        priceTotal: c.priceTotal,
        priceMonthly: c.priceMonthly,
        runtime: c.runtime,
        energy: c.energy,
        buildType: c.buildType,
        basicOptions: c.basicOptions,
      }));
    },
  },
  Mutation: {
    createCar: async (parent, { car }, context, info) => {
      const newCar = await new Car({
        manufacturer: car.manufacturer,
        model: car.model,
        priceTotal: car.priceTotal,
        priceMonthly: car.priceMonthly,
        runtime: car.runtime,
        energy: car.energy,
        buildType: car.buildType,
        basicOptions: car.basicOptions,
      });

      return new Promise((resolve, reject) => {
        newCar.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateCar: (parent, { _id, car }, context, info) => {
      return new Promise((resolve, reject) => {
        Car.findByIdAndUpdate(_id, { $set: { ...car } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          },
        );
      });
    },
    deleteCar: (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Car.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
};
