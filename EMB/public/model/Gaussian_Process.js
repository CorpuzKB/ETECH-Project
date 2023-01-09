class GaussianProcessRegression extends Utils{
    constructor(params){
        super();
        this.params = params;
    }

    async Condition(N, X, y)
    {
        let K_XX = new Kernels(this.params, X, X).Matrix();
        let K_XN = new Kernels(this.params, X, N).Matrix();
        let K_NN = new Kernels(this.params, N, N).Matrix();
        let I = await this.Inverse(tf.add(K_XX, tf.eye(K_XX.shape[1], K_XX.shape[0]).mul(this.params.noise)));
        let K = tf.transpose(K_XN).matMul(I);
        let mean = tf.mean(y);
        let u_N = tf.ones([N.shape[0], 1]).mul(mean);
        let u_X = tf.ones([X.shape[0], 1]).mul(mean);
        I.dispose(); K_XX.dispose();
        return [tf.add(K.matMul(y.sub(u_X)), u_N), K_NN.sub(K.matMul(K_XN))];
    }   
}

