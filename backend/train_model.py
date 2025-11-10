# Example script for training a crop disease detection model
# This is a reference implementation - adjust according to your dataset

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import os

# Configuration
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 25
NUM_CLASSES = 38  # PlantVillage dataset has 38 classes

def create_model():
    """
    Create a CNN model for crop disease classification
    Using transfer learning with MobileNetV2
    """
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze base model
    base_model.trainable = False
    
    # Create model
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    return model

def compile_model(model):
    """Compile the model with optimizer and loss function"""
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

def train_model(model, train_data, val_data):
    """
    Train the model with callbacks
    
    Args:
        model: Keras model
        train_data: Training dataset
        val_data: Validation dataset
    """
    callbacks = [
        keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=5,
            restore_best_weights=True
        ),
        keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=3,
            min_lr=1e-7
        ),
        keras.callbacks.ModelCheckpoint(
            'model/best_model.h5',
            monitor='val_accuracy',
            save_best_only=True
        )
    ]
    
    history = model.fit(
        train_data,
        validation_data=val_data,
        epochs=EPOCHS,
        callbacks=callbacks
    )
    
    return history

def convert_to_tflite(model, output_path='model/model.tflite'):
    """Convert Keras model to TensorFlow Lite format"""
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    tflite_model = converter.convert()
    
    with open(output_path, 'wb') as f:
        f.write(tflite_model)
    
    print(f"Model converted to TFLite and saved to {output_path}")

if __name__ == '__main__':
    print("AgriVision Model Training Script")
    print("=" * 50)
    
    # Note: You need to prepare your dataset first
    # This script assumes you have train_data and val_data prepared
    
    print("\n⚠️ This is a template script.")
    print("Before running, you need to:")
    print("1. Download the PlantVillage dataset")
    print("2. Prepare train_data and val_data using tf.keras.preprocessing.image_dataset_from_directory")
    print("3. Uncomment and run the training code below")
    
    # Uncomment to train:
    # model = create_model()
    # model = compile_model(model)
    # history = train_model(model, train_data, val_data)
    # model.save('model/model.h5')
    # convert_to_tflite(model)
