import tensorflow as tf
import numpy as np

def test_model():
    print("TensorFlow version:", tf.__version__)
    
    try:
        # Load the model
        print("\nTrying to load model...")
        model = tf.keras.models.load_model('model/model.h5')
        
        # Print model summary
        print("\nModel architecture:")
        model.summary()
        
        # Create a test input
        print("\nTesting prediction...")
        test_input = np.random.rand(1, 224, 224, 3)
        prediction = model.predict(test_input)
        
        print("\nPrediction shape:", prediction.shape)
        print("Number of classes:", prediction.shape[1])
        print("Sample prediction:", prediction[0][:5])  # Show first 5 class probabilities
        
        return True
        
    except Exception as e:
        print("\nError loading/testing model:", str(e))
        return False

if __name__ == "__main__":
    test_model()