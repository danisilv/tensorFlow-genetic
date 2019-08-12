import * as tf from "@tensorflow/tfjs";

export class Neural {

    public model: tf.Sequential;


    public async initalize() {
        this.model = await tf.sequential({
            layers: [tf.layers.dense({ units: 1, inputShape: [1], activation: 'relu', useBias: true })]
        });
        this.model.add(tf.layers.dense({ units: 2, activation: 'sigmoid', useBias: true }));
        this.model.add(tf.layers.dense({ units: 1, activation: 'relu', useBias: true }));

        await this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError', metrics: ['accuracy'] });
    }

    public async predict(input: number[]) {

        let tensorResult = await (this.model.predict(tf.tensor([input])) as tf.Tensor<tf.Rank>).data();

        return tensorResult;
    }

    public async  getWeight(layer: number) {
        return await this.model.layers[layer].getWeights()[0].data();
    }

    public async  getWeights() {
        let weights = [];
        weights.push(await this.getWeight(0));
        weights.push(await this.getWeight(1));
        weights.push(await this.getWeight(2));
        // weights.push(await this.getWeight(3));
        return weights;
    }

    public async setWeights(weights) {
        await this.setWeight(0, weights[0]);
        await this.setWeight(1, weights[1]);
        await this.setWeight(2, weights[2]);
        // await this.setWeight(3,weights[3]);
    }

    public async setWeight(layer: number, weights) {
        var newWights = [];
        var shape;

        if (layer == 0) shape = [1, 1]
        else if (layer == 1) shape = [1, 2]
        //else if (layer == 2) shape = [50,20]
        else if (layer == 2) shape = [2, 1]

        return tf.tensor(weights, shape)
        await this.model.layers[layer].setWeights(newWights)
    }


}

//window.Neural = Neural;