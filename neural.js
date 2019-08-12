"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs");
class Neural {
    initalize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.model = yield tf.sequential({
                layers: [tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', useBias: true })]
            });
            this.model.add(tf.layers.dense({ units: 2, activation: 'sigmoid', useBias: true }));
            this.model.add(tf.layers.dense({ units: 1, activation: 'relu', useBias: true }));
            yield this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError', metrics: ['accuracy'] });
        });
    }
    predict(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let tensorResult = yield this.model.predict(tf.tensor([input])).data();
            return tensorResult;
        });
    }
    getWeight(layer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.layers[layer].getWeights()[0].data();
        });
    }
    getWeights() {
        return __awaiter(this, void 0, void 0, function* () {
            let weights = [];
            weights.push(yield this.getWeight(0));
            weights.push(yield this.getWeight(1));
            weights.push(yield this.getWeight(2));
            // weights.push(await this.getWeight(3));
            return weights;
        });
    }
    setWeights(weights) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setWeight(0, weights[0]);
            yield this.setWeight(1, weights[1]);
            yield this.setWeight(2, weights[2]);
            // await this.setWeight(3,weights[3]);
        });
    }
    setWeight(layer, weights) {
        return __awaiter(this, void 0, void 0, function* () {
            var newWights = [];
            var shape;
            if (layer == 0)
                shape = [1, 1];
            else if (layer == 1)
                shape = [1, 2];
            //else if (layer == 2) shape = [50,20]
            else if (layer == 2)
                shape = [2, 1];
            return tf.tensor(weights, shape);
            yield this.model.layers[layer].setWeights(newWights);
        });
    }
}
exports.Neural = Neural;
//window.Neural = Neural;
//# sourceMappingURL=neural.js.map