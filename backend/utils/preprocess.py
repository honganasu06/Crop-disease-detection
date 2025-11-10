import numpy as np
from PIL import Image

def preprocess_image(image_path, target_size=(224, 224)):
    """
    Preprocess image for model prediction
    
    Args:
        image_path: Path to image file or PIL Image object
        target_size: Target size for resizing (width, height)
    
    Returns:
        Preprocessed numpy array ready for model input
    """
    # Load image
    if isinstance(image_path, str):
        img = Image.open(image_path)
    else:
        img = image_path
    
    # Convert RGBA to RGB if necessary
    if img.mode == 'RGBA':
        img = img.convert('RGB')
    
    # Resize image
    img = img.resize(target_size)
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Normalize pixel values to [0, 1]
    img_array = img_array.astype(np.float32) / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

def format_prediction(class_name):
    """
    Format class name for display
    
    Args:
        class_name: Raw class name from model
    
    Returns:
        Formatted disease name
    """
    # Replace underscores and format
    formatted = class_name.replace('___', ' - ').replace('_', ' ')
    return formatted

def calculate_confidence(predictions):
    """
    Calculate confidence percentage from prediction array
    
    Args:
        predictions: Model prediction output
    
    Returns:
        Confidence score as percentage
    """
    max_confidence = np.max(predictions)
    return float(max_confidence * 100)
