# # shors_app/serializers.py
# from rest_framework import serializers

# class FactorInputSerializer(serializers.Serializer):
#     number = serializers.IntegerField(required=True, min_value=2, 
#                                      help_text="The number to factorize")
#     use_quantum = serializers.BooleanField(default=False, required=False,
#                                          help_text="Whether to use quantum algorithm (slower but good for demonstration)")
    
# class FactorResultSerializer(serializers.Serializer):
#     result = serializers.CharField()
#     factors = serializers.ListField(child=serializers.IntegerField())
from rest_framework import serializers

class FactorInputSerializer(serializers.Serializer):
    number = serializers.IntegerField(
        required=True, min_value=2, 
        help_text="The number to factorize"
    )
    use_quantum = serializers.BooleanField(
        default=False, required=False,
        help_text="Whether to use quantum algorithm (slower but good for demonstration)"
    )
    shots = serializers.IntegerField(
        default=100, min_value=1, max_value=10000, required=False,
        help_text="Number of times to run the quantum circuit (higher = more accuracy)"
    )
    noise_model = serializers.ChoiceField(
        choices=['ideal', 'depolarizing', 'bitflip'], default='ideal', required=False,
        help_text="Type of noise model applied to the quantum circuit"
    )
    backend = serializers.ChoiceField(
        choices=['simulator', 'ibm_q', 'google_qpu'], default='simulator', required=False,
        help_text="Choose the backend to run quantum computations (simulated or real quantum device)"
    )

class FactorResultSerializer(serializers.Serializer):
    result = serializers.CharField(help_text="Result status (e.g., 'composite', 'prime')")
    factors = serializers.ListField(
        child=serializers.IntegerField(), 
        help_text="List of prime factors"
    )
    quantum_details = serializers.DictField(
        required=False, help_text="Additional details about quantum execution"
    )
