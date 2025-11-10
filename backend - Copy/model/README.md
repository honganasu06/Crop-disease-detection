# Model Directory

Place your trained model file here:
- `model.h5` (Keras model)
- OR `model.tflite` (TensorFlow Lite model)

## Training Your Own Model

If you want to train your own model using the PlantVillage dataset:

1. Download the PlantVillage dataset
2. Use TensorFlow/Keras to train a CNN model
3. Save the model as `model.h5` or `model.tflite`
4. Place it in this directory

## Using Pre-trained Models

You can download pre-trained models from:
- Kaggle: PlantVillage Disease Classification models
- TensorFlow Hub
- HuggingFace Model Hub

The model should accept input shape (224, 224, 3) and output 38 classes for the PlantVillage dataset.
